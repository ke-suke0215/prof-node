import { test, expect } from '@playwright/test';

test.describe('Login Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // ページが完全に読み込まれるまで待機
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  test('ランディングページのヘッダー「ログイン」ボタンが /login に遷移する', async ({ page }) => {
    // ヘッダー内のログインリンクをクリック
    await page.locator('header a:has-text("ログイン")').click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('text=ProfNodeへようこそ')).toBeVisible();
  });

  test('ランディングページのヘッダー「無料で始める」ボタンが /login に遷移する', async ({ page }) => {
    // ヘッダー内の無料で始めるリンクをクリック
    await page.locator('header a:has-text("無料で始める")').click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('text=ProfNodeへようこそ')).toBeVisible();
  });

  test('ヒーローセクションの「今すぐ無料で作成」ボタンが /login に遷移する', async ({ page }) => {
    // ヒーローセクション内の「今すぐ無料で作成」リンクをクリック
    await page.locator('main a:has-text("今すぐ無料で作成")').first().click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('text=ProfNodeへようこそ')).toBeVisible();
  });

  test('CTAセクションの「今すぐ無料で作成」ボタンが /login に遷移する', async ({ page }) => {
    // CTAセクション（最下部）の「今すぐ無料で作成」リンクをクリック
    await page.locator('a:has-text("今すぐ無料で作成")').last().click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('text=ProfNodeへようこそ')).toBeVisible();
  });

  test('/login ページに Google認証ボタンとサインアップフォームが表示される', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'networkidle' });
    
    // ページタイトルの確認
    await expect(page.locator('text=ProfNodeへようこそ')).toBeVisible();
    
    // 説明文の確認
    await expect(page.locator('text=ログインまたは新規登録してWeb名刺を始めましょう')).toBeVisible();
    
    // Google認証ボタンの確認
    await expect(page.locator('button:has-text("Googleでアカウント作成")')).toBeVisible();
    
    // サインアップフォームの確認
    await expect(page.locator('label:has-text("お名前")')).toBeVisible();
    await expect(page.locator('input#name')).toBeVisible();
    
    await expect(page.locator('label:has-text("メールアドレス")')).toBeVisible();
    await expect(page.locator('input#email')).toBeVisible();
    
    await expect(page.locator('label:has-text("パスワード"):first')).toBeVisible();
    await expect(page.locator('input#password')).toBeVisible();
    
    await expect(page.locator('label:has-text("パスワード（確認）")')).toBeVisible();
    await expect(page.locator('input#password-confirm')).toBeVisible();
    
    await expect(page.locator('button[type="submit"]:has-text("アカウント作成")')).toBeVisible();
    
    // その他のUI要素の確認
    await expect(page.locator('span:has-text("または")')).toBeVisible();
    await expect(page.locator('text=すでにアカウントをお持ちの方は')).toBeVisible();
    await expect(page.locator('text=利用規約')).toBeVisible();
    await expect(page.locator('text=プライバシーポリシー')).toBeVisible();
  });
});