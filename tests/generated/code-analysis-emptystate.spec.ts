import { test, expect } from '@playwright/test';

test.describe('Code Analysis: EmptyState', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Render No Selection State', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-search-title')).toBeVisible();
    await expect(page.getByTestId('text-search-title')).toHaveText('No Customer Selected');
  });

  test('Render No Results State', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('input-customer-search').fill('NONEXISTENT_CUSTOMER_99999');
    await expect(page.getByTestId('text-search-title')).toBeVisible();
    await expect(page.getByTestId('text-search-title')).toHaveText('No Results Found');
  });
});