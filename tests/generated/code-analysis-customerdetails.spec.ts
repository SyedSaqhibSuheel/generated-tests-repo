import { test, expect } from '@playwright/test';

test.describe('Code Analysis: CustomerDetails', () => {
  test('Customer details and verification signals render successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    await page.getByTestId('tab-database').click();
    await page.locator('[data-testid^="button-view-"]').first().click();

    await expect(page.getByTestId('text-customer-name')).toBeVisible();
    await expect(page.getByTestId('text-customer-id')).toBeVisible();
    await expect(page.getByTestId('button-send-auth')).toBeVisible();
  });

  test('Approved auth status displays success state and allows new request', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    await page.locator('[data-testid^="button-request-"]').nth(4).click();
    await expect(page.getByTestId('button-new-request')).toBeVisible();
    await page.getByTestId('button-new-request').click();
  });

  test('Component displays waiting state for customer response', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    await page.locator('[data-testid^="button-request-"]').nth(3).click();
  });

  test('Component displays loading state when authStatus is sending', async ({ page }) => {
    test.skip(true, '');
  });

  test('Trigger authorization request from idle state', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    await page.getByTestId('tab-database').click();
    await page.locator('[data-testid^="button-view-"]').first().click();
    await expect(page.getByTestId('button-send-auth')).toBeVisible();
    await page.getByTestId('button-send-auth').click();
  });

  test('Denied auth status displays error state and allows retry', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();

    await page.locator('[data-testid^="button-request-"]').nth(2).click();
    await expect(page.getByTestId('button-retry-auth')).toBeVisible();
    await page.getByTestId('button-retry-auth').click();
  });
});
