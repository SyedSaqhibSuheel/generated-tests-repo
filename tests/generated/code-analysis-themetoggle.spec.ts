import { test, expect } from '@playwright/test';

test.describe('Code Analysis: ThemeToggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Toggle theme from light to dark', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    const themeToggleButton = page.getByTestId('button-theme-toggle');
    await expect(themeToggleButton).toBeVisible();
    
    await themeToggleButton.click();
    
    // Verify theme switched to dark mode (aria-label or icon updates accordingly)
    await expect(themeToggleButton).toHaveAttribute('aria-label', /dark/i);
  });

  test('Toggle theme from dark to light', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    const themeToggleButton = page.getByTestId('button-theme-toggle');
    await expect(themeToggleButton).toBeVisible();
    
    // Click twice to cycle back to light mode (or ensure state toggles twice)
    await themeToggleButton.click();
    await themeToggleButton.click();
    
    // Verify theme switched back to light mode
    await expect(themeToggleButton).toHaveAttribute('aria-label', /light/i);
  });
});