import { test, expect } from '@playwright/test';

test.describe('Customer authorization request approved/denied by external mobile app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByTestId('input-username').fill('Sarah Johnson');
    await page.getByTestId('input-password').fill('12345');
    await page.getByTestId('button-sign-in').click();
    await page.waitForURL('http://localhost:5173/');
  });

  test('Customer approves the authorization request from their mobile app', async ({ page }) => {
    // The real approval is performed by the customer's own mobile app via the
    // external Fidar service, outside this system - simulated deterministically
    // at the network boundary CallCenterUI itself calls.
    await page.route('**/api/external-auth/trigger', (route) =>
      route.fulfill({ json: { sessionId: 'e2e-session-approved' } })
    );
    await page.route('**/api/external-auth/status/*', (route) =>
      route.fulfill({ json: { status: 'APPROVED' } })
    );

    await page.getByTestId('input-customer-search').fill('12345678');
    await page.getByTestId('button-customer-12345678').click();
    await page.getByTestId('button-send-auth').click();

    await expect(page.getByTestId('text-modal-title')).toHaveText('Customer Verified', { timeout: 15000 });
    await expect(page.getByTestId('text-modal-customer-id')).toBeVisible();
    await page.getByTestId('button-close-modal').click();
    await expect(page.getByTestId('button-new-request')).toBeVisible();
  });

  test('Customer denies the authorization request from their mobile app', async ({ page }) => {
    await page.route('**/api/external-auth/trigger', (route) =>
      route.fulfill({ json: { sessionId: 'e2e-session-denied' } })
    );
    await page.route('**/api/external-auth/status/*', (route) =>
      route.fulfill({ json: { status: 'DENIED' } })
    );

    await page.getByTestId('input-customer-search').fill('12345678');
    await page.getByTestId('button-customer-12345678').click();
    await page.getByTestId('button-send-auth').click();

    await expect(page.getByTestId('text-modal-title')).toHaveText('Authorization Declined', { timeout: 15000 });
    await page.getByTestId('button-close-modal').click();
    await expect(page.getByTestId('button-retry-auth')).toBeVisible();
  });
});
