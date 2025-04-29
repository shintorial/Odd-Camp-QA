import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login-page.ts';
import { RegisterPage } from '../pages/Register-page.ts';
import { HomePage } from '../pages/Home-page.ts';
import { NavbarPage } from '../pages/Navbar-page.ts';
import { PostPage } from '../pages/Post-page.ts';
import { CreatePostPage } from '../pages/CreatePost-page.ts';
import { EditPostPage } from '../pages/EditPost-page.ts';

const data = {
    OddsCamp: 'https://odds-camp.onrender.com/users/sign_in',
};

test.describe('Logout Page', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);

        await page.goto(data.OddsCamp);
        await loginPage.fillEmail('piti@odd.team');
        await loginPage.fillPassword('12345678');
        await loginPage.clickLogin();
    });

    test('TC-016 Logout at Home', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const navbarPage = new NavbarPage(page);

        await navbarPage.clickLogout();
        await expect(page.locator('body > div > div.sign-in-header > h2')).toBeVisible();
    });

    test('TC-017 Logout at Post', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const navbarPage = new NavbarPage(page);

        await homePage.clickCard();
        await navbarPage.clickLogout();
        await expect(page.locator('body > div > div.sign-in-header > h2')).toBeVisible();
    });

    test('TC-018 Logout at Create Post', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const navbarPage = new NavbarPage(page);
        const createPostPage = new CreatePostPage(page);

        await createPostPage.clickCreatePost();
        await navbarPage.clickLogout();
        await expect(page.locator('body > div > div.sign-in-header > h2')).toBeVisible();
    });

    test('TC-019 Logout at Edit Post', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const navbarPage = new NavbarPage(page);
        const postPage = new PostPage(page);
        const editPostPage = new EditPostPage(page);

        await homePage.clickCard();
        await postPage.clickEditPost();
        await navbarPage.clickLogout();
        await expect(page.locator('body > div > div.sign-in-header > h2')).toBeVisible();
    });
});