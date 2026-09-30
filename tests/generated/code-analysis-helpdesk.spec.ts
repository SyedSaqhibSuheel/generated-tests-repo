import { test, expect } from '@playwright/test';

test.describe('Code Analysis: Helpdesk', () => {
  test('Switch to Customer Database tab', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('tab-database').click();
    await expect(page.getByTestId('tab-database')).toBeVisible();
  });

  test('Agent Logout Flow', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('button-logout').click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('Switch to Customer Verification tab', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('tab-database').click();
    await page.getByTestId('tab-verification').click();
    await expect(page.getByTestId('tab-verification')).toBeVisible();
  });

  test('Handle API Error on Auth Request Trigger', async ({ page }) => {
    await page.route('**/api/external-auth/trigger', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    await page.goto('http://localhost:5173/');
    await page.getByTestId('button-view-12345678').click();
    await page.getByTestId('button-send-auth').click();
    await expect(page.getByTestId('button-send-auth')).toBeVisible();
  });

  test('Select Customer and Trigger Verification', async ({ page }) => {
    await page.route('**/api/external-auth/trigger', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, sessionId: '12345' })
      });
    });

    await page.goto('http://localhost:5173/');
    await page.getByTestId('button-view-12345678').click();
    await page.getByTestId('button-send-auth').click();
    await expect(page.getByTestId('button-send-auth')).toBeVisible();
  });
});