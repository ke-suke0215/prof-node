import { test, expect } from '@playwright/test';

test.describe('Navigation Tests', () => {
  test('Header Login button navigates to login page', async ({ page }) => {
    await page.goto('/');
    
    // ログインボタンをクリック
    await page.click('a[href="/login"]');
    
    // ログインページに遷移することを確認
    await expect(page).toHaveURL('/login');
    
    // ログインページの基本要素が表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Header register button navigates to register page', async ({ page }) => {
    await page.goto('/');
    
    // 登録ボタンをクリック (ヘッダーの"無料で始める"ボタン)
    await page.click('a[href="/register"]');
    
    // 登録ページに遷移することを確認
    await expect(page).toHaveURL('/register');
    
    // 登録ページの基本要素が表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Hero section CTA navigates to register page', async ({ page }) => {
    await page.goto('/');
    
    // ヒーローセクションのCTAボタンをクリック
    const heroButton = page.locator('main').locator('a[href="/register"]').first();
    await heroButton.click();
    
    // 登録ページに遷移することを確認
    await expect(page).toHaveURL('/register');
    
    // 登録ページの基本要素が表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
  });

  test('CTA section navigates to register page', async ({ page }) => {
    await page.goto('/');
    
    // CTAセクションのボタンをクリック
    const ctaButton = page.locator('a[href="/register"]').last();
    await ctaButton.click();
    
    // 登録ページに遷移することを確認
    await expect(page).toHaveURL('/register');
    
    // 登録ページの基本要素が表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
  });

  test('Landing page renders correctly', async ({ page }) => {
    await page.goto('/');
    
    // ページタイトルが正しく設定されていることを確認
    await expect(page).toHaveTitle(/ProfNode/);
    
    // 主要なランディングページ要素が表示されることを確認
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('Login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    
    // ログインページの基本要素が表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
  });

  test('Register page renders correctly', async ({ page }) => {
    await page.goto('/register');
    
    // 登録ページの基本要素が表示されることを確認
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('form')).toBeVisible();
  });
});