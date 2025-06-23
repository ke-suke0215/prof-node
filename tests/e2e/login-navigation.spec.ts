import { test, expect } from '@playwright/test';

test.describe('Login Navigation', () => {
  test('ランディングページのヘッダー「ログイン」ボタンが /login に遷移する', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=ログイン');
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('ランディングページのヘッダー「無料で始める」ボタンが /login に遷移する', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=無料で始める');
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('ヒーローセクションの「今すぐ無料で作成」ボタンが /login に遷移する', async ({ page }) => {
    await page.goto('/');
    
    // ヒーローセクション内の「今すぐ無料で作成」ボタンをクリック
    await page.locator('main >> text=今すぐ無料で作成').first().click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('CTAセクションの「今すぐ無料で作成」ボタンが /login に遷移する', async ({ page }) => {
    await page.goto('/');
    
    // CTAセクション（最下部）の「今すぐ無料で作成」ボタンをクリック
    await page.locator('text=今すぐ無料で作成').last().click();
    
    await expect(page).toHaveURL('/login');
    await expect(page.locator('h1')).toContainText('ProfNodeへようこそ');
  });

  test('/login ページに Google認証ボタンとメール/パスワードフォームが表示される', async ({ page }) => {
    await page.goto('/login');
    
    // Google認証ボタンの確認
    await expect(page.locator('text=Googleでログイン')).toBeVisible();
    
    // メール/パスワードフォームの確認
    await expect(page.locator('label[for="email"]')).toContainText('メールアドレス');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toContainText('パスワード');
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toContainText('ログイン');
    
    // その他のUI要素の確認
    await expect(page.locator('text=または')).toBeVisible();
    await expect(page.locator('text=アカウントをお持ちでない方は')).toBeVisible();
    await expect(page.locator('text=パスワードをお忘れの方はこちら')).toBeVisible();
  });
});