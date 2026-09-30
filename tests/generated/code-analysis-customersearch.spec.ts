import { test, expect } from '@playwright/test';

test.describe('Code Analysis: CustomerSearch', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.goto('http://localhost:5173/');
  });

  test('Interact with recent searches', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const recentSearchButton = page.locator('[data-testid^="button-recent-search-"]').first();
    await recentSearchButton.click();
    const searchInput = page.getByTestId('input-customer-search');
    await expect(searchInput).not.toHaveValue('');
  });

  test('Clear recent searches', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const clearButton = page.getByTestId('button-clear-recent');
    if (await clearButton.isVisible()) {
      await clearButton.click();
      await expect(clearButton).not.toBeVisible();
    }
  });

  test('Successful customer search by name, email, or ID', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const searchInput = page.getByTestId('input-customer-search');
    await searchInput.fill('John');
    const customerResult = page.locator('[data-testid^="button-customer-"]').first();
    await expect(customerResult).toBeVisible();
  });

  test('Clear search input using clear button', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const searchInput = page.getByTestId('input-customer-search');
    await searchInput.fill('John');
    const clearSearchButton = page.getByTestId('button-clear-search');
    await expect(clearSearchButton).toBeVisible();
    await clearSearchButton.click();
    await expect(searchInput).toHaveValue('');
    await expect(clearSearchButton).not.toBeVisible();
  });

  test('Select a customer from search results', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const searchInput = page.getByTestId('input-customer-search');
    await searchInput.fill('John');
    const customerResult = page.locator('[data-testid^="button-customer-"]').first();
    await expect(customerResult).toBeVisible();
    await customerResult.click();
  });

  test('No customers found empty state', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const searchInput = page.getByTestId('input-customer-search');
    await searchInput.fill('nonexistentuserxyz');
    await expect(page.getByText('No customers found')).toBeVisible();
    await expect(page.getByText('Try a different search term')).toBeVisible();
  });

  test('Search input below threshold', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const searchInput = page.getByTestId('input-customer-search');
    await searchInput.fill('J');
    await expect(page.getByText('Enter at least 2 characters to search')).toBeVisible();
  });
});