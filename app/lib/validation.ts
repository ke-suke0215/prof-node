export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];

  if (!email.trim()) {
    errors.push('メールアドレスを入力してください');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('有効なメールアドレスを入力してください');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password) {
    errors.push('パスワードを入力してください');
  } else {
    if (password.length < 8) {
      errors.push('パスワードは8文字以上で入力してください');
    }
    if (!/(?=.*[a-z])/.test(password)) {
      errors.push('パスワードには小文字を含めてください');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      errors.push('パスワードには大文字を含めてください');
    }
    if (!/(?=.*\d)/.test(password)) {
      errors.push('パスワードには数字を含めてください');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validatePasswordConfirmation(password: string, passwordConfirm: string): ValidationResult {
  const errors: string[] = [];

  if (password !== passwordConfirm) {
    errors.push('パスワードが一致しません');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function getSupabaseErrorMessage(error: unknown): string {
  if (!error || typeof error !== 'object' || !('message' in error) || typeof error.message !== 'string') {
    return '不明なエラーが発生しました';
  }

  const message = error.message.toLowerCase();

  if (message.includes('email already registered') || message.includes('user already registered')) {
    return 'このメールアドレスは既に登録されています';
  }
  
  if (message.includes('invalid login credentials') || message.includes('invalid email or password')) {
    return 'メールアドレスまたはパスワードが正しくありません';
  }
  
  if (message.includes('email not confirmed')) {
    return 'メールアドレスが確認されていません。確認メールをご確認ください';
  }
  
  if (message.includes('signup is disabled')) {
    return '新規登録が無効になっています';
  }
  
  if (message.includes('password should be at least')) {
    return 'パスワードは6文字以上で入力してください';
  }
  
  if (message.includes('invalid email')) {
    return '有効なメールアドレスを入力してください';
  }

  // その他のエラーはそのまま返す
  return error.message;
}