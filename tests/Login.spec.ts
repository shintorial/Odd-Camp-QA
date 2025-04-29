import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login-page.ts';
import { RegisterPage } from '../pages/Register-page.ts';
import { HomePage } from '../pages/Home-page.ts';
import { NavbarPage } from '../pages/Navbar-page.ts';
import { PostPage } from '../pages/Post-page.ts';
import { CreatePostPage } from '../pages/CreatePost-page.ts';
import { EditPostPage } from '../pages/EditPost-page.ts';
import { GoogleSheet } from '../utils/GoogleSheet-util.ts';

const data = {
    OddsCamp: 'https://odds-camp.onrender.com/users/sign_in',
};

let currentTestName = '';



test.describe('Login Page', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page);
        currentTestName = testInfo.title;

        await page.goto(data.OddsCamp);
    });

    test.afterEach(async ({ page }, testInfo) => {
        const status = testInfo.status === 'passed' ? '✅' : '❌';
        const googleSheet = new GoogleSheet();

        await googleSheet.updateSheet(currentTestName, status);
    });

    test('TC-012 Login Success', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fillEmail('piti@odd.team');
        await loginPage.fillPassword('12345678');
        await loginPage.clickLogin();

        await expect(page.locator('body > div > div.posts-header > h1')).toBeVisible();
    });

    test('TC-013 Login with empty field', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fillEmail('');
        await loginPage.fillPassword('');
        await loginPage.clickLogin();

        await expect(page.locator('body > div > div.sign-in-header > h2')).toBeVisible();
    });

    test('TC-014 Login with only email', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fillEmail('piti@odd.team');
        await loginPage.fillPassword('');
        await loginPage.clickLogin();

        await expect(page.locator('body > div > div.sign-in-header > h2')).toBeVisible();
    });

    test('TC-015 Login with only password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fillEmail('');
        await loginPage.fillPassword('12345678');
        await loginPage.clickLogin();

        await expect(page.locator('body > div > div.sign-in-header > h2')).toBeVisible();
    });
});