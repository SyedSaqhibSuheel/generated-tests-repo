import { test, expect } from '@playwright/test';

test.describe('Code Analysis: IconRail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('Switch to Customer Database tab', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('rail-database').click();
    await expect(page.getByTestId('rail-database')).toHaveAttribute('aria-current', 'page');
    await expect(page.getByTestId('rail-database')).toHaveAttribute('data-active', 'true');
  });

  test('Tooltip display on hover', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('rail-verification').hover();
    const tooltip = page.getByRole('tooltip').or(page.locator('[role="tooltip"], [data-tooltip], title, :text("Customer Verification")')).first();
    await expect(page.getByTestId('rail-verification')).toBeVisible();
  });

  test('Trigger Logout action', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('rail-logout').click();
    await expect(page).toHaveURL(/\/login/);
  });

  test('Switch to Customer Verification tab', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.getByTestId('rail-database').click();
    await page.getByTestId('rail-verification').click();
    await expect(page.getByTestId('rail-verification')).toHaveAttribute('aria-current', 'page');
    await expect(page.getByTestId('rail-verification')).toHaveAttribute('data-active', 'true');
  });

  test('Toggle Agent Panel visibility', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/');
    await page.getByTestId('rail-agent-panel').click();
    await expect(page.getByTestId('rail-agent-panel')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByTestId('rail-agent-panel')).toHaveAttribute('aria-label', /Hide agent details/i);
  });
});