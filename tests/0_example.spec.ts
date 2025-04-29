import { test, expect } from '@playwright/test';
import { GoogleSheet } from '../utils/GoogleSheet-util.ts';

let currentTestName = '';
const updateSheet = new GoogleSheet();

test.beforeEach(async ({ }, testInfo) => {
  currentTestName = testInfo.title;
});

test.afterEach(async ({ }, testInfo) => {
  const status = testInfo.status === 'passed' ? '✅' : '❌';
  await updateSheet.updateSheet(currentTestName, status);
});

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
