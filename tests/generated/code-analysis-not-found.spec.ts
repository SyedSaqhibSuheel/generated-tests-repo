import { test, expect } from '@playwright/test';

test.describe('Code Analysis: not-found', () => {
  test('Display 404 page on invalid route', async ({ page }) => {
    await page.goto('http://localhost:5173/non-existent-route-12345');
    
    await expect(page.getByText('Error 404')).toBeVisible();
    await expect(page.getByText('Page not found')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Back to Help Desk' })).toBeVisible();
  });

  test('Navigate back to Help Desk from 404 page', async ({ page }) => {
    await page.goto('http://localhost:5173/non-existent-route-12345');
    
    await expect(page.getByText('Error 404')).toBeVisible();
    
    await page.getByRole('button', { name: 'Back to Help Desk' }).click();
    
    await expect(page).toHaveURL('http://localhost:5173/');
  });
});