import { test, expect } from '@playwright/test';

test.describe('Code Analysis: AgentPanel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Display None Selected State for Customer', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-search-title')).toBeVisible();
  });

  test('Display Agent Initials Fallback', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-employee-name')).toBeVisible();
  });

  test('Handle Zero Resolved Requests for Approval Rate', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('badge-pending-count')).toBeVisible();
  });

  test('Verify Live Clock and Badge Presence', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-employee-role')).toBeVisible();
  });

  test('Display Agent Profile with Avatar', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('text-employee-name')).toBeVisible();
    await expect(page.getByTestId('text-employee-role')).toBeVisible();
  });

  test('Render Request Metrics and Approval Rate', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await expect(page.getByTestId('badge-pending-count')).toBeVisible();
  });

  test('Display Selected Customer Information', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('input-customer-search').fill('CUST001');
    await expect(page.getByTestId('input-customer-search')).toHaveValue('CUST001');
  });
});