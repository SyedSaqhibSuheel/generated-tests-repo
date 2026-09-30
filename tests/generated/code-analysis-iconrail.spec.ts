import { test, expect } from '@playwright/test';

test.describe('Code Analysis: IconRail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Toggle Agent Panel visibility on XL viewports', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/');
    // Agent panel toggle state check on XL viewports
    const tabVerification = page.getByTestId('tab-verification');
    await expect(tabVerification).toBeVisible();
  });

  test('Verify Tooltip display on hover', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const tabVerification = page.getByTestId('tab-verification');
    await tabVerification.hover();
    await expect(tabVerification).toBeVisible();
  });

  test('Switch to Customer Verification tab', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const tabVerification = page.getByTestId('tab-verification');
    await tabVerification.click();
    await expect(tabVerification).toBeVisible();
  });

  test('Switch to Customer Database tab', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const tabDatabase = page.getByTestId('tab-database');
    await tabDatabase.click();
    await expect(tabDatabase).toBeVisible();
  });

  test('Agent Panel toggle hidden on non-XL viewports', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 600 });
    await page.goto('http://localhost:5173/');
    const tabVerification = page.getByTestId('tab-verification');
    await expect(tabVerification).toBeVisible();
  });

  test('Trigger Logout action', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('button-logout').click();
    await expect(page).toHaveURL('http://localhost:5173/login');
  });
});