import { test, expect } from '@playwright/test';

test.describe('Code Analysis: EmptyState', () => {
  test('Render No Selection Empty State', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-verification').click();

    const noSelectionEl = page.getByTestId('no-selection');
    await expect(noSelectionEl).toBeVisible();
    await expect(noSelectionEl).toContainText('No Customer Selected');
  });

  test('Render No Results Empty State', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.getByTestId('tab-database').click();
    await page.getByTestId('input-database-search').type('nonexistentcustomerxyz');

    const noResultsEl = page.getByTestId('no-results');
    await expect(noResultsEl).toBeVisible();
    await expect(noResultsEl).toContainText('No Results Found');
  });
});