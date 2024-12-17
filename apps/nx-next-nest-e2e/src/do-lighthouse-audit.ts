import { test, expect, chromium, Page } from '@playwright/test';
import path from 'path';
import os from 'os';
import { playAudit } from 'playwright-lighthouse';

export const doLighthouseAudit = async ({ page }: { page: Page }) => {
  const userDataDir = path.join(os.tmpdir(), 'pw', String(Math.random()));
  const context = await chromium.launchPersistentContext(userDataDir, {
    args: ['--remote-debugging-port=9222'],
  });

  await playAudit({
    url: page.url(),
    page: await context.newPage(),
    port: 9222,
    thresholds: {
      performance: 50,
      accessibility: 50,
      'best-practices': 50,
      seo: 50,
      pwa: 30,
    },
  });
};
