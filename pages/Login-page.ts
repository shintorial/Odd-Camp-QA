export  class LoginPage {
    page: any;

    constructor(page) {
        this.page = page;
    }

    async fillEmail(username: string) {
        await this.page.locator('#user_email').fill(username);
    }

    async fillPassword(password: string) {
        await this.page.locator('#user_password').fill(password);
    }

    async clickLogin() {
        await this.page.getByRole('button', { name: 'Log In' }).click();
    }

    async clickRegister() {
        await this.page.getByRole('link', { name: 'Register' }).click();
    }
}