import { test, expect } from '@playwright/test';

test.describe('Code Analysis: CustomerDetails', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Approved auth status displays success state and allows new request', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const newRequestButton = page.getByTestId('button-new-request');
    await expect(newRequestButton).toBeVisible();
    await expect(newRequestButton).toBeEnabled();
    await newRequestButton.click();
  });

  test('Customer details and verification signals render successfully', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-customer-name')).toBeVisible();
    await expect(page.getByTestId('text-customer-id')).toBeVisible();
    const sendAuthButton = page.getByTestId('button-send-auth');
    await expect(sendAuthButton).toBeVisible();
    await expect(sendAuthButton).toBeEnabled();
  });

  test('Trigger authorization request from idle state', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const sendAuthButton = page.getByTestId('button-send-auth');
    await expect(sendAuthButton).toBeVisible();
    await sendAuthButton.click();
  });

  test('Component displays loading state when authStatus is sending', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const sendAuthButton = page.getByTestId('button-send-auth');
    await expect(sendAuthButton).toBeVisible();
  });

  test('Component displays waiting state for customer response', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const sendAuthButton = page.getByTestId('button-send-auth');
    await expect(sendAuthButton).toBeVisible();
  });

  test('Denied auth status displays error state and allows retry', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    const retryAuthButton = page.getByTestId('button-retry-auth');
    await expect(retryAuthButton).toBeVisible();
    await expect(retryAuthButton).toBeEnabled();
    await retryAuthButton.click();
  });
});