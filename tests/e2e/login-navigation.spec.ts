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
  });

  test('ランディングページのヘッダー「無料で始める」ボタンが /login に遷移する', async ({ page }) => {
    // ヘッダー内の無料で始めるリンクをクリック
    await page.locator('header a:has-text("無料で始める")').click();
    
    await expect(page).toHaveURL('/login');
  });

  test('ヒーローセクションの「今すぐ無料で作成」ボタンが /signup に遷移する', async ({ page }) => {
    // ヒーローセクション内の「今すぐ無料で作成」リンクをクリック
    await page.locator('main a:has-text("今すぐ無料で作成")').first().click();
    
    await expect(page).toHaveURL('/signup');
  });

  test('CTAセクションの「今すぐ無料で作成」ボタンが /signup に遷移する', async ({ page }) => {
    // CTAセクション（最下部）の「今すぐ無料で作成」リンクをクリック
    await page.locator('a:has-text("今すぐ無料で作成")').last().click();
    
    await expect(page).toHaveURL('/signup');
  });

  test('/login ページが正常に表示される', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'networkidle' });
    
    // ページが /login であることを確認
    await expect(page).toHaveURL('/login');
    
    // 基本的な要素の存在確認（緩い条件）
    const buttonCount = await page.locator('button').count();
    const inputCount = await page.locator('input').count();
    const formCount = await page.locator('form').count();
    
    // 最低でも1つのボタンまたは入力要素またはフォームが存在することを確認
    expect(buttonCount + inputCount + formCount).toBeGreaterThan(0);
  });

  test('/signup ページが正常に表示される', async ({ page }) => {
    await page.goto('/signup', { waitUntil: 'networkidle' });
    
    // ページが /signup であることを確認
    await expect(page).toHaveURL('/signup');
    
    // 基本的な要素の存在確認
    const buttonCount = await page.locator('button').count();
    const inputCount = await page.locator('input').count();
    const formCount = await page.locator('form').count();
    
    // 最低でも1つのボタンまたは入力要素またはフォームが存在することを確認
    expect(buttonCount + inputCount + formCount).toBeGreaterThan(0);
    
    // Google OAuthボタンの存在確認
    await expect(page.locator('button:has-text("Googleでアカウント作成")')).toBeVisible();
    
    // GitHub OAuthボタンの存在確認
    await expect(page.locator('button:has-text("GitHubでアカウント作成")')).toBeVisible();
  });
});