export class EditPostPage {
    page: any;

    constructor(page) {
        this.page = page;
    }

    async editTitle(title: string) {
        await this.page.locator('#post_title').fill(title);
    }

    async editContent(content: string) {
        await this.page.locator('#post_content').fill(content);
    }

    async clickUpdatePost() {
        await this.page.getByRole('button', { name: 'Update Post' }).click();
    }

    async cancelEditPost() {
        await this.page.getByRole('link', { name: 'Cancel' }).click();
    }
}