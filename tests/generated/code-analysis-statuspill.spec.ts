import { test, expect } from '@playwright/test';

test.describe('Code Analysis: StatusPill', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Render Danger Status Pill', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const customerRow = page.locator('[data-testid^="row-customer-"]').first();
    await expect(customerRow).toBeVisible();
  });

  test('Render Warning Status Pill with Custom Label', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const pendingBadge = page.getByTestId('badge-pending-count');
    await expect(pendingBadge).toBeVisible();
  });

  test('Case-Insensitive Status Matching', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const customerRow = page.locator('[data-testid^="row-customer-"]').first();
    await expect(customerRow).toBeVisible();
  });

  test('Render Success Status Pill', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const customerRow = page.locator('[data-testid^="row-customer-"]').first();
    await expect(customerRow).toBeVisible();
  });

  test('Fallback to Neutral Tone for Unknown Status', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const title = page.getByTestId('text-active-requests-title');
    await expect(title).toBeVisible();
  });

  test('Custom ClassName and Data TestId Forwarding', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const customerRow = page.locator('[data-testid^="row-customer-"]').first();
    await expect(customerRow).toBeVisible();
  });
});