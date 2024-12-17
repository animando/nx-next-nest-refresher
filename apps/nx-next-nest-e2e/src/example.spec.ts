import { test, expect } from '@playwright/test';
import { doLighthouseAudit } from './do-lighthouse-audit';

test('has title', async ({ page }) => {
  await page.goto('/');

  expect(await page.locator('h1').innerText()).toContain('Home Page');
  await doLighthouseAudit({ page });
});
