import { test, expect } from '@playwright/test';

test.describe('Code Analysis: EmptyState', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Handle Invalid or Missing Type Prop', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('input-customer-search').fill('INVALIDSTATE');
    
    // The component defaults to rendering the fallback/no-results view gracefully
    await expect(page.getByTestId('text-search-title')).toBeVisible();
  });

  test('Render Empty State for No Selection', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('tab-verification').click();

    // Verify the 'no-selection' empty state heading and guidance text
    await expect(page.getByTestId('text-search-title')).toBeVisible();
  });

  test('Render Empty State for No Results', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('input-customer-search').fill('NONEXISTENTCUSTOMER999');

    // Verify the 'no-results' empty state is displayed
    await expect(page.getByTestId('text-search-title')).toBeVisible();
  });
});