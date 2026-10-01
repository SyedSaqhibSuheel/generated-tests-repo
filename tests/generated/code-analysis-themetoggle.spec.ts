import { test, expect } from '@playwright/test';

test.describe('Code Analysis: ThemeToggle', () => {
  test('Apply custom className prop correctly', async ({ page }) => {
    test.skip(true, 'The custom className prop is a component-level property tested in unit isolation (e.g. ThemeToggle.tsx) and cannot be triggered or modified via any end-user interaction in the running application UI.');
  });

  test('Toggle theme from light to dark mode', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    
    const themeToggle = page.getByTestId('button-theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    await themeToggle.click();
    
    await expect(themeToggle).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  test('Toggle theme from dark to light mode', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    
    const themeToggle = page.getByTestId('button-theme-toggle');
    await expect(themeToggle).toBeVisible();
    
    // Toggle to dark mode
    await themeToggle.click();
    await expect(themeToggle).toHaveAttribute('aria-label', 'Switch to light mode');
    
    // Toggle back to light mode
    await themeToggle.click();
    await expect(themeToggle).toHaveAttribute('aria-label', 'Switch to dark mode');
  });
});