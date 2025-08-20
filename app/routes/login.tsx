import type { Route } from './+types/login';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { AuthLayout } from '../components/auth/AuthLayout';
import {
  OAuthButton,
  GoogleIcon,
  GitHubIcon,
} from '../components/auth/OAuthButton';
import { FormField, Divider } from '../components/auth/AuthForm';
import { Button } from '../components/ui/button';
import { supabase } from '../lib/supabase.client';
import { useAuth } from '../contexts/AuthContext';
import { validateEmail, getSupabaseErrorMessage } from '../lib/validation';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ログイン - ProfNode' },
    {
      name: 'description',
      content: 'ProfNodeにログインして、あなたのデジタル名刺を管理しましょう。',
    },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // すでに認証済みの場合はダッシュボードにリダイレクト
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    // バリデーションチェック
    const emailValidation = validateEmail(formData.email);
    
    if (!emailValidation.isValid) {
      setError(emailValidation.errors.join('\n'));
      return;
    }
    
    if (!formData.password.trim()) {
      setError('パスワードを入力してください');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      
      if (error) {
        setError(getSupabaseErrorMessage(error));
        return;
      }
      
      if (data.user) {
        navigate('/dashboard');
      }
    } catch {
      setError('ログインに失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        setError(error.message);
      }
    } catch {
      setError(`${provider}でのログインに失敗しました。`);
    }
  };

  return (
    <AuthLayout
      title="ProfNodeにログイン"
      subtitle=""
      description="お帰りなさい。ログインして続行してください。"
    >
      <div className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
            {error.split('\n').map((line, index) => (
              <div key={index} className={index > 0 ? 'mt-1' : ''}>
                {line}
              </div>
            ))}
          </div>
        )}
        
        {/* OAuth Buttons */}
        <div className="space-y-3">
          <OAuthButton 
            provider="google" 
            onClick={() => handleOAuthSignIn('google')}
          >
            <GoogleIcon />
            Googleでログイン
          </OAuthButton>

          <OAuthButton 
            provider="github" 
            onClick={() => handleOAuthSignIn('github')}
          >
            <GitHubIcon />
            GitHubでログイン
          </OAuthButton>
        </div>

        <Divider>または</Divider>

        {/* Email Form */}
        <form className="space-y-4 sm:space-y-6" onSubmit={handleEmailSignIn}>
          <FormField
            id="email"
            name="email"
            label="メールアドレス"
            type="email"
            autoComplete="email"
            placeholder="your@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <FormField
            id="password"
            name="password"
            label="パスワード"
            type="password"
            autoComplete="current-password"
            placeholder="パスワードを入力"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <div>
            <Button 
              type="submit" 
              variant="primary" 
              size="auth-submit"
              disabled={isLoading}
            >
              {isLoading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            アカウントをお持ちでない方は{' '}
            <a
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              新規登録
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
