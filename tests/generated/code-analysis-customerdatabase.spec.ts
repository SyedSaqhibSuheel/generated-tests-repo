import { test, expect } from '@playwright/test';

test.describe('Code Analysis: CustomerDatabase', () => {
  test('Display Customer Database initial state', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-database').click();
    await expect(page.getByTestId('text-database-title')).toBeVisible();
    await expect(page.locator('[data-testid^="row-customer-"]').first()).toBeVisible();
  });

  test('Search customers by name, email, or customer ID', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-database').click();
    await page.getByTestId('input-database-search').fill('Syed');
    await expect(page.locator('[data-testid^="row-customer-"]').first()).toBeVisible();
  });

  test('Filter customers by status', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-database').click();
    await page.getByTestId('select-status-filter').click();
  });

  test('Empty state handling when search returns no results', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-database').click();
    await page.getByTestId('input-database-search').fill('NonExistentCustomer12345');
    await expect(page.getByText('No customers found')).toBeVisible();
  });

  test('Trigger view customer action', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-database').click();
    await page.locator('[data-testid^="button-view-"]').first().click();
  });

  test('Trigger send authorization request action', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-database').click();
    await page.locator('[data-testid^="button-send-"]').first().click();
  });
});
