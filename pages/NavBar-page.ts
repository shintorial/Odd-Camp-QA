export class NavbarPage {
    page: any;

    constructor(page) {
        this.page = page;
    }

    async clickLogout() {
        await this.page.locator('body > nav > div > div > div.navbar-actions > form > button').click();
    }
}
