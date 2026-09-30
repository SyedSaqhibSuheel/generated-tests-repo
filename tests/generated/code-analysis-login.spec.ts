import { test, expect } from '@playwright/test';

test.describe('Code Analysis: Login', () => {
  test('Auto-Redirect when Already Authenticated', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('isAuthenticated', 'true');
    });
    await page.goto('http://localhost:5173/login');
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('Forgot Password Interaction', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByText('Forgot Password?').click();
    await expect(page.getByText('contact IT support')).toBeVisible();
  });

  test('Successful Login with Valid Credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await expect(page.getByText('Success')).toBeVisible();
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('Failed Login with Invalid Credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Wrong User');
    await page.getByTestId('input-password').fill('wrongpassword');
    await page.getByTestId('button-sign-in').click();
    await expect(page.getByText('Authentication Failed')).toBeVisible();
    await expect(page).toHaveURL('http://localhost:5173/login');
  });

  test('Toggle Password Visibility', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-password').fill('12345');
    
    const passwordInput = page.getByTestId('input-password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    const toggleButton = page.locator('button').filter({ hasText: /show|hide|👁|password/i }).first();
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');
    
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });
});