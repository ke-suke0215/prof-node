import { supabase } from '../config/supabase';
import { db } from '../db/client';
import { users } from '../db/schema';
import { nanoid } from 'nanoid';

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResult {
  success: boolean;
  user?: {
    id: string;
    nanoId: string;
  };
  error?: string;
}

export async function signUp({ email, password, name }: SignUpData): Promise<AuthResult> {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return {
        success: false,
        error: authError.message,
      };
    }

    if (!authData.user) {
      return {
        success: false,
        error: 'ユーザーの作成に失敗しました',
      };
    }

    const nanoId = nanoid();

    const [newUser] = await db.insert(users).values({
      id: authData.user.id,
      name: name || null,
      nanoId,
    }).returning();

    return {
      success: true,
      user: {
        id: newUser.id,
        nanoId: newUser.nanoId,
      },
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      error: 'サインアップ中にエラーが発生しました',
    };
  }
}