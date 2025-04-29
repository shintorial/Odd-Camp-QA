export class CreatePostPage {
    page: any;

    constructor(page) {
        this.page = page;
    }

    async fillTitle(title: string) {
        await this.page.locator('#post_title').fill(title);
    }

    async fillContent(content: string) {
        await this.page.locator('#post_content').fill(content);
    }

    async clickCreatePost() {
        await this.page.getByRole('button', { name: 'Create Post' }).click();
    }

    async cancelCreatePost() {
        await this.page.getByRole('link', { name: 'Cancel' }).click();
    }
}