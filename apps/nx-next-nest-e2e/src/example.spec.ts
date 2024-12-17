import { test, expect } from '@playwright/test';
import { playAudit } from 'playwright-lighthouse';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').innerText()).toContain('Home Page');

  await playAudit({
    page,
    port: 9222,
  });
});
