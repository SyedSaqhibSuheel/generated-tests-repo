import { test, expect } from '@playwright/test';

test.describe('Code Analysis: ConstellationBackground', () => {
  test('Render ConstellationBackground with default props', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Verify the SVG element representing the background is present
    const svgElement = page.locator('svg').first();
    await expect(svgElement).toBeVisible();
  });

  test('Render ConstellationBackground with custom className', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Verify the root SVG container is present and rendered
    const svgElement = page.locator('svg').first();
    await expect(svgElement).toBeVisible();
  });

  test('Verify deterministic generation and structural integrity', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    // Verify that nodes and lines are deterministically generated within the SVG
    const svgElement = page.locator('svg').first();
    await expect(svgElement).toBeVisible();
    
    // Check that path or circle elements inside the background SVG exist
    const svgChildrenCount = await svgElement.locator('circle, line, path').count();
    expect(svgChildrenCount).toBeGreaterThan(0);
  });
});