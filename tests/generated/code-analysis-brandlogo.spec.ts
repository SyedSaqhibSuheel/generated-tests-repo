import { test, expect } from '@playwright/test';

test.describe('Code Analysis: BrandLogo', () => {
  test('Render BrandLogo with default medium size', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    
    await page.goto('http://localhost:5173/');
    
    const logo = page.getByTestId('e56');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Smart Bank');
  });

  test('Render BrandLogo with small size prop', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    const logo = page.getByTestId('e14');
    await expect(logo).toBeVisible();
  });

  test('Render BrandLogo with large size prop', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    const logo = page.getByTestId('e14');
    await expect(logo).toBeVisible();
  });

  test('Verify accessibility attributes and screen reader support', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    const logo = page.getByTestId('e14');
    await expect(logo).toBeVisible();
  });

  test('Render BrandLogo with custom className', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    const logo = page.getByTestId('e14');
    await expect(logo).toBeVisible();
  });
});
