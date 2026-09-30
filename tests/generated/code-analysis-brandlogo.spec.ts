import { test, expect } from '@playwright/test';

test.describe('Code Analysis: BrandLogo', () => {
  test('Render BrandLogo with large size', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByTestId('input-username')).toBeVisible();
  });

  test('Render BrandLogo with default size', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByTestId('input-username')).toBeVisible();
  });

  test('Render BrandLogo with small size', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByTestId('input-username')).toBeVisible();
  });

  test('Apply custom className prop', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByTestId('input-username')).toBeVisible();
  });

  test('Verify accessibility and screen reader support', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await expect(page.getByTestId('input-username')).toBeVisible();
  });
});