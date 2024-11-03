import { test, expect } from '@playwright/test';

test.describe("MEDIA - Media", async () => {

    const correctUser = 'k10-tu-anh';
    const correctPassword = 'RQ#MVZ%C3pD*LbTvUB9thuFx';
    const name = 'TuAnh';
    const fileName = `${name}.txt`;

    const xpathMedia = {

        userName: `//input[@id='user_login']`,
        password: `//input[@id='user_pass']`,
        loginButton: `//input[@id='wp-submit']`,
        menuPost: `//div[.='Posts']`,
        menuMedia: `//div[.='Media']`,
        titleMedia: `//h1[@class='wp-heading-inline']`,
        addMediaButton: `//div[@id='wp-media-grid']/a[.='Add New Media File']`,
        attachmentDetails: `//h1[.='Attachment details']`,
        fileName: `//div[.='guide.txt']`,
        deleteFile: `//button[@class='button-link delete-attachment']`,
        selectFile: `//button[@class='browser button button-hero']`
    }

    test.beforeEach(async ({ page }) => {

        // Go to page https://pw-practice-dev.playwrightvn.com/wp-admin
        await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
        // Login successfully
        await page.fill(xpathMedia.userName, correctUser);
        await page.fill(xpathMedia.password, correctPassword);
        await page.click(xpathMedia.loginButton);
        await expect(page.url()).toContain('/wp-admin');
        // Select menu "Posts/Tags"
        await expect(page.locator(xpathMedia.menuMedia)).toBeVisible();
        await page.click(xpathMedia.menuMedia);
        await expect(page.locator(xpathMedia.titleMedia)).toBeVisible();
    });

    test('MEDIA_FILES_001 - Media - upload file success', async ({ page }) => {

        await test.step('Thực hiện upload file', async () => {
            await page.click(xpathMedia.addMediaButton);
            await page.locator(xpathMedia.selectFile).setInputFiles(`test-data/TuAnh.txt`);
        });

        await test.step('F5 trang', async () => {
            await page.reload();
            await expect(page.locator(fileName)).toBeVisible();
        });

        await test.step('Teardown: xoá các dữ liệu đã thêm vào', async () => {
            await page.click(xpathMedia.fileName);
            await expect(page.locator(xpathMedia.attachmentDetails));
            page.on('dialog', async dialog => {
                await dialog.accept();
            })
            await page.click(xpathMedia.deleteFile);
        });
    });
});