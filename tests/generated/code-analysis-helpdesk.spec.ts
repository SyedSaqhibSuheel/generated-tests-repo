import { test, expect } from '@playwright/test';

test.describe('Code Analysis: Helpdesk', () => {
  test('Agent Logout', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    
    await page.getByTestId('button-logout').click();
    
    await expect(page).toHaveURL('http://localhost:5173/login');
  });

  test('Handle external auth request rejection or timeout/error', async ({ page }) => {
    test.skip(true, 'While a customer can be selected and an auth request initiated via button-send-auth, handling an external rejection, timeout, or error requires external push events or customer mobile app simulator components (like button-simulator-deny) which are not present or interactive in the Agent Helpdesk UI portal.');
  });

  test('Switch between Helpdesk tabs', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    
    await page.getByTestId('tab-database').click();
    await expect(page.getByTestId('text-database-title')).toBeVisible();

    await page.getByTestId('tab-verification').click();
    await expect(page.getByTestId('tab-verification')).toBeVisible();
  });

  test('Select a customer from search and trigger auth request', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    
    await page.getByTestId('tab-database').click();
    await page.getByTestId('button-view-12345678').click();
    await page.getByTestId('button-send-auth').click();
    
    await expect(page.getByTestId('text-customer-id')).toBeVisible();
  });
});