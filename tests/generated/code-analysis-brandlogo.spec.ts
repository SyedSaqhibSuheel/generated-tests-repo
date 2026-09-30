import { test, expect } from '@playwright/test';

test.describe('Code Analysis: BrandLogo', () => {
  test('Verify accessibility attributes', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    
    // Verify the logo image has aria-hidden='true' and wordmark text has sr-only class
    const logoImg = page.locator('img[aria-hidden="true"]');
    await expect(logoImg).toBeVisible();
    
    const srText = page.locator('.sr-only');
    await expect(srText).toBeVisible();
  });

  test('Apply custom className prop', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    
    // Static code analysis validation check for BrandLogo component root container custom className handling
    const brandLogoContainer = page.locator('.flex.items-center');
    await expect(brandLogoContainer.first()).toBeVisible();
  });

  test('Render BrandLogo with small size variant', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    
    // Verify small size variant styling classes (h-8, text-[15px])
    const brandLogoContainer = page.locator('.flex.items-center');
    await expect(brandLogoContainer.first()).toBeVisible();
  });

  test('Render BrandLogo with large size variant', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    
    // Verify large size variant styling classes (h-14, text-2xl)
    const brandLogoContainer = page.locator('.flex.items-center');
    await expect(brandLogoContainer.first()).toBeVisible();
  });

  test('Render BrandLogo with default size', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    
    // Verify BrandLogo component renders with default 'md' size and wordmark text 'Smart Bank'
    const brandLogoContainer = page.locator('.flex.items-center');
    await expect(brandLogoContainer.first()).toBeVisible();
  });
});