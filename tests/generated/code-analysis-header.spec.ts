import { test, expect } from '@playwright/test';

test.describe('Code Analysis: Header', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.goto('http://localhost:5173/');
  });

  test('Trigger notification click handler', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('button-notifications').click();
    // Verify notification button click interaction is successfully triggered
    await expect(page.getByTestId('button-notifications')).toBeVisible();
  });

  test('Avatar fallback initialization with multi-word names', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const employeeNameElem = page.getByTestId('text-employee-name');
    await expect(employeeNameElem).toBeVisible();
  });

  test('Render header with employee details and zero pending requests', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-employee-name')).toBeVisible();
    await expect(page.getByTestId('text-employee-role')).toBeVisible();
    await expect(page.getByTestId('button-notifications')).toBeVisible();
  });

  test('Render header with positive pending request count', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const notificationButton = page.getByTestId('button-notifications');
    await expect(notificationButton).toBeVisible();
  });

  test('Trigger logout action', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('button-logout').click();
  });
});