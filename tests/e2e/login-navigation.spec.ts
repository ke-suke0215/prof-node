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
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('ランディングページのヘッダー「無料で始める」ボタンが /login に遷移する', async ({ page }) => {
    // ヘッダー内の無料で始めるリンクをクリック
    await page.locator('header a:has-text("無料で始める")').click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('ヒーローセクションの「今すぐ無料で作成」ボタンが /login に遷移する', async ({ page }) => {
    // ヒーローセクション内の「今すぐ無料で作成」リンクをクリック
    await page.locator('main a:has-text("今すぐ無料で作成")').first().click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('CTAセクションの「今すぐ無料で作成」ボタンが /login に遷移する', async ({ page }) => {
    // CTAセクション（最下部）の「今すぐ無料で作成」リンクをクリック
    await page.locator('a:has-text("今すぐ無料で作成")').last().click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('/login ページに Google認証ボタンとメール/パスワードフォームが表示される', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'networkidle' });
    
    // ページタイトルの確認
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
    
    // Google認証ボタンの確認
    await expect(page.locator('button:has-text("Googleでログイン")')).toBeVisible();
    
    // メール/パスワードフォームの確認
    await expect(page.locator('label[for="email"]')).toContainText('メールアドレス');
    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toContainText('パスワード');
    await expect(page.locator('input#password')).toBeVisible();
    await expect(page.locator('button[type="submit"]:has-text("ログイン")')).toBeVisible();
    
    // その他のUI要素の確認
    await expect(page.locator('text=または')).toBeVisible();
    await expect(page.locator('text=アカウントをお持ちでない方は')).toBeVisible();
    await expect(page.locator('text=パスワードをお忘れの方はこちら')).toBeVisible();
  });
});