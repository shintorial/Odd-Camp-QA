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


test.describe('Register Page', () => {


    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);


        await page.goto(data.OddsCamp);
        await loginPage.clickRegister();
        await expect(page.getByRole('heading', { name: 'Create your account' })).toBeVisible();
    });

    test('TC-001 Register Success', async ({ page }) => {
        const registerPage = new RegisterPage(page);
        const homePage = new HomePage(page);

        await registerPage.fillEmail('1@odds.team');
        await registerPage.fillPassword('12345678');
        await registerPage.fillPasswordConfirmation('12345678');
        await registerPage.clickRegister();

        await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
    });

    test('TC- 002 Empty Fill', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('');
        await registerPage.fillPassword('');
        await registerPage.fillPasswordConfirmation('');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Email can\'t be blank'));
    });

    test('TC- 003 Input only email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('123@mail.com');
        await registerPage.fillPassword('');
        await registerPage.fillPasswordConfirmation('');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Password can\'t be blank'));
    });

    test('TC- 004 Input only password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('123@mail.com');
        await registerPage.fillPassword('');
        await registerPage.fillPasswordConfirmation('');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Invalid Password'));
    });

    test('TC- 005 Input only password confirmation', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('');
        await registerPage.fillPassword('');
        await registerPage.fillPasswordConfirmation('12345678');
        await registerPage.clickRegister();
        await expect(registerPage.showErrorMessage('Password confirmation can\'t be blank'));
    });

    test('TC- 006 Empty Email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('');
        await registerPage.fillPassword('12345678');
        await registerPage.fillPasswordConfirmation('12345678');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Invalid Email'));
    });

    test('TC- 007 Empty Password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('test@fdsg.com');
        await registerPage.fillPassword('');
        await registerPage.fillPasswordConfirmation('12345678');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Invalid Password'));
    });

    test('TC- 008 Empty Password Confirmation', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('od@fdod.com');
        await registerPage.fillPassword('12345678');
        await registerPage.fillPasswordConfirmation('');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Password confirmation can\'t be blank'));
    });

    test('TC- 096 Wrong Password Confirmation', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('test@gmail.com');
        await registerPage.fillPassword('12345678');
        await registerPage.fillPasswordConfirmation('123456782123');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Invalid Password'));
    });

    test('TC- 009 Enter a code with less than 6 digits', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('test@fdsg.com');
        await registerPage.fillPassword('12345678');
        await registerPage.fillPasswordConfirmation('12345678');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('Password must be at least 6 characters long'));
    });

    test('TC- 010 Used Email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const registerPage = new RegisterPage(page);

        await registerPage.fillEmail('60020414@kmitl.ac.th');
        await registerPage.fillPassword('12345678');
        await registerPage.fillPasswordConfirmation('12345678');
        await registerPage.clickRegister();

        await expect(registerPage.showErrorMessage('This email has already been taken'));
    });
});