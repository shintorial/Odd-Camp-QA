export class RegisterPage {
    page: any;

    constructor(page) {
        this.page = page;
    }

    async fillEmail(username: string) {
        await this.page.locator('#user_email').fill(username);
    }

    async fillPassword(email: string) {
        await this.page.locator('#user_password').fill(email);
    }

    async fillPasswordConfirmation(password: string) {
        await this.page.locator('#user_password_confirmation').fill(password);
    }

    async clickRegister() {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }

    async showErrorMessage(error: string) {
        await this.page.locator('#error_explanation').toContainText(error);
    }
}
