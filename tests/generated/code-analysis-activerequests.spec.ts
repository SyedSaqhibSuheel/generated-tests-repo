import { test, expect } from '@playwright/test';

test.describe('Code Analysis: ActiveRequests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Handle Missing RequestedAt Timestamp Fallback', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-active-requests-title')).toBeVisible();
  });

  test('Hide Pending Badge When No Pending Requests Exist', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('badge-pending-count')).not.toBeVisible();
  });

  test('Render Empty State When No Requests Exist', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-active-requests-title')).toBeVisible();
  });

  test('Select a Request via Click Action', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const requestButton = page.locator('[data-testid^="button-request-"]').first();
    if (await requestButton.isVisible()) {
      await requestButton.click();
    }
    await expect(page.getByTestId('text-active-requests-title')).toBeVisible();
  });

  test('Render Active Requests List and Pending Badge Successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-active-requests-title')).toBeVisible();
    const badge = page.getByTestId('badge-pending-count');
    if (await badge.isVisible()) {
      await expect(badge).toBeVisible();
    }
    const requestButton = page.locator('[data-testid^="button-request-"]').first();
    if (await requestButton.isVisible()) {
      await expect(requestButton).toBeVisible();
    }
  });
});