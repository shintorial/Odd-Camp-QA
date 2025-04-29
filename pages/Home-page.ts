export class HomePage {
    page: any;

    constructor(page) {
        this.page = page;
    }

    async clickCreatePost() {
        await this.page.getByRole('link', { name: 'New Post' }).click();
    }

    async clickCard() {
        await this.page.getByRole('link', { name: 'ขออวยพรให้ตัวเองเข้มแข็ง และใจเย็นกับ... benchawankaewson.1997@gmail.com' }).click();
    }
}