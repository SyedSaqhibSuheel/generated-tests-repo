import { test, expect } from '@playwright/test';

test.describe('Code Analysis: CustomerDatabase', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Filter Customers Using Status Dropdown', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('select-status-filter').selectOption('active');
    const customerRows = page.locator('[data-testid^="row-customer-"]');
    await expect(customerRows.first()).toBeVisible();
  });

  test('Display Customer Database with Initial Data', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-database-title')).toBeVisible();
    const customerRows = page.locator('[data-testid^="row-customer-"]');
    await expect(customerRows.first()).toBeVisible();
  });

  test('Filter Customers Using Search Input', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('input-database-search').fill('John');
    const customerRows = page.locator('[data-testid^="row-customer-"]');
    await expect(customerRows.first()).toBeVisible();
  });

  test('Display Empty State When No Customers Match Filters', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('input-database-search').fill('NONEXISTENT_CUSTOMER_XYZ');
    const customerRows = page.locator('[data-testid^="row-customer-"]');
    await expect(customerRows).toHaveCount(0);
  });

  test('Trigger View Customer Action', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const viewButton = page.locator('[data-testid^="button-view-"]').first();
    await expect(viewButton).toBeVisible();
    await viewButton.click();
  });

  test('Trigger Send Authorization Request Action', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const sendButton = page.locator('[data-testid^="button-send-"]').first();
    await expect(sendButton).toBeVisible();
    await sendButton.click();
  });
});