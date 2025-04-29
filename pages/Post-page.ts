export class PostPage {
    page: any;

    constructor(page) {
        this.page = page;
    }

    async clickEditPost() {
        await this.page.getByRole('link', { name: 'Edit' }).click();
    }

    async clickDeletePost() {
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }

    async clickLike() {
        await this.page.getByRole('button', { name: 'favorite' }).click();
    }

    async clickUnlike() {
        await this.page.getByRole('button', { name: 'favorite' }).click();
    }

    async shareMyPostToFacebook() {
        await this.page.getByRole('link').nth(2).click();
    }

    async shareMyPostToTwitter() {
        await this.page.getByRole('link').nth(3).click();
    }

    async shareAnotherPostToFacebook() {
        await this.page.getByRole('link').nth(1).click();
    }

    async shareAnotherPostToTwitter() {
        await this.page.getByRole('link').nth(2).click();
    }

    async comment(writeComment: string) {
        await this.page.locator('#comment_content').fill(writeComment);
        await this.page.getByRole('button', { name: 'Comment' }).click();
    }

    async deleteComment() {
        await this.page.getByRole('button', { name: 'Delete' }).nth(1).click();
    }

}