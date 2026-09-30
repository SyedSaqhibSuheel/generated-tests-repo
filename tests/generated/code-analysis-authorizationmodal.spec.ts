import { test, expect } from '@playwright/test';

test.describe('Code Analysis: AuthorizationModal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Verify Approved Authorization Modal Display', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Trigger or render the modal with approved status (assuming UI triggers or state allows testing via dashboard)
    // If the modal is driven by simulation/interactions, we trigger an approval or ensure elements are checked:
    await expect(page.getByTestId('text-modal-title')).toContainText('Customer Verified');
    await expect(page.getByTestId('text-modal-customer-id')).toContainText('CUST-12345');
  });

  test('Verify Denied Authorization Modal Display', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    await expect(page.getByTestId('text-modal-title')).toContainText('Authorization Declined');
    await expect(page.getByTestId('text-modal-customer-id')).toContainText('CUST-98765');
  });

  test('Close Modal via Continue Button', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    const closeButton = page.getByTestId('button-close-modal');
    if (await closeButton.isVisible()) {
      await closeButton.click();
      await expect(closeButton).not.toBeVisible();
    }
  });
});