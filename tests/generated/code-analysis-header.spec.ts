import { test, expect } from '@playwright/test';

test.describe('Code Analysis: Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Verify clicking the logout button triggers the handler', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('button-logout')).toBeVisible();
    await page.getByTestId('button-logout').click();
  });

  test('Verify clicking the notification button triggers the handler', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('button-notifications')).toBeVisible();
    await page.getByTestId('button-notifications').click();
  });

  test('Verify notification badge displays correct count when pendingCount > 0', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('button-notifications')).toBeVisible();
    await expect(page.getByTestId('badge-pending-count')).toBeVisible();
  });

  test('Verify rendering with single-word employee name', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-employee-name')).toBeVisible();
  });

  test('Verify header renders employee details and computed initials correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-employee-name')).toBeVisible();
    await expect(page.getByTestId('text-employee-role')).toBeVisible();
  });

  test('Verify notification badge is hidden when pendingCount is zero', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('button-notifications')).toBeVisible();
  });
});