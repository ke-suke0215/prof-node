import type { Route } from './+types/register';
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
import { validateEmail, validatePassword, validatePasswordConfirmation, getSupabaseErrorMessage } from '../lib/validation';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ユーザー登録 - ProfNode' },
    {
      name: 'description',
      content: 'ProfNodeに登録して、あなただけのデジタル名刺を作成しましょう。',
    },
  ];
}

export default function Register() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: ''
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

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoading) return;
    
    // バリデーションチェック
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    const passwordConfirmValidation = validatePasswordConfirmation(formData.password, formData.passwordConfirm);
    
    const allErrors = [
      ...emailValidation.errors,
      ...passwordValidation.errors,
      ...passwordConfirmValidation.errors
    ];
    
    if (allErrors.length > 0) {
      setError(allErrors.join('\n'));
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        setError(getSupabaseErrorMessage(error));
        return;
      }
      
      if (data.user) {
        // プロフィール作成APIを呼び出し
        try {
          const response = await fetch('/api/auth/profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.session?.access_token}`
            },
            body: JSON.stringify({
              authUuid: data.user.id
            })
          });
          
          if (!response.ok) {
            console.warn('Profile creation failed:', await response.text());
          }
        } catch (profileError) {
          console.warn('Profile creation error:', profileError);
        }
        
        // 登録成功メッセージまたはダッシュボードへリダイレクト
        if (data.user.email_confirmed_at) {
          navigate('/dashboard');
        } else {
          setError('確認メールを送信しました。メールを確認してアカウントを有効化してください。');
        }
      }
    } catch {
      setError('登録に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignUp = async (provider: 'google' | 'github') => {
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
      setError(`${provider}での登録に失敗しました。`);
    }
  };

  return (
    <AuthLayout
      title="ProfNodeに登録"
      subtitle=""
      description="新規登録(無料)して利用を開始しましょう。"
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
            onClick={() => handleOAuthSignUp('google')}
          >
            <GoogleIcon />
            Googleで登録
          </OAuthButton>

          <OAuthButton 
            provider="github" 
            onClick={() => handleOAuthSignUp('github')}
          >
            <GitHubIcon />
            GitHubで登録
          </OAuthButton>
        </div>

        <Divider>または</Divider>

        {/* Email Form */}
        <form className="space-y-4 sm:space-y-6" onSubmit={handleEmailSignUp}>
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
            autoComplete="new-password"
            placeholder="パスワードを入力 (8文字以上)"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <FormField
            id="password-confirm"
            name="passwordConfirm"
            label="パスワード確認"
            type="password"
            autoComplete="new-password"
            placeholder="パスワードを再入力"
            value={formData.passwordConfirm}
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
              {isLoading ? '登録中...' : '登録する'}
            </Button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            すでにアカウントをお持ちですか？{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              ログイン
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
