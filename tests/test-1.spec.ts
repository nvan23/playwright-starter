import { test, expect } from '@playwright/test';

test.describe('POST - Post', async () => {
  const correctUser = 'k10-tu-anh';
  const correctPassword = 'RQ#MVZ%C3pD*LbTvUB9thuFx';
  const errorMessage = 'A name is required for this term.';
  const errorExistName = 'A term with the name provided already exists in this taxonomy.';
  const name = 'TuAnh';
  const tagName = `tag ${name} ${Date.now()}`;
  const successMessage = 'Tag added.';

  const xpathPost = {
    userName: `//input[@id='user_login']`,
    password: `//input[@id='user_pass']`,
    loginButton: `//input[@id='wp-submit']`,
    menuPost: `//div[.='Posts']`,
    titlePosts: `//h1[@class='wp-heading-inline']`,
    optionTags: `//a[.='Tags']`,
    titleTags: `//h1[@class='wp-heading-inline']`,
    addNewTagButton: `//input[@id='submit']`,
    addNewError: `//div[@class='notice notice-error']`,
    xpathUserName: `//input[@id='tag-name']`,
    existNameError: `//div[@class='notice notice-error']`,
    addNewSuccess: `//div[@class='notice notice-success is-dismissible']`,
    newTag: `//strong[a=${name}]`,
  }

  test.beforeEach(async ({ page }) => {
    // Go to page https://pw-practice-dev.playwrightvn.com/wp-admin
    await page.goto("https://pw-practice-dev.playwrightvn.com/wp-admin");
    // Login successfully
    await page.fill(xpathPost.userName, correctUser);
    await page.fill(xpathPost.password, correctPassword);
    await page.click(xpathPost.loginButton);
    await expect(page.url()).toContain('/wp-admin');
    // Select menu "Posts/Tags"
    await expect(page.locator(xpathPost.menuPost)).toBeVisible();
    await page.click(xpathPost.menuPost);
    await expect(page.locator(xpathPost.titlePosts)).toBeVisible();
    await page.click(xpathPost.optionTags);
    await expect(page.locator(xpathPost.optionTags)).toBeVisible();
    await expect(page.locator(xpathPost.titleTags)).toBeVisible();
  });

  test('POST_TAG_001 - Tag - add tag failed', async ({ page }) => {
    await test.step('Click button Add New Tag', async () => {
      await expect(page.locator(xpathPost.addNewTagButton)).toBeVisible();
      await page.click(xpathPost.addNewTagButton);
      await expect(page.locator(xpathPost.addNewError)).toBeVisible();
      await expect(page.locator(xpathPost.addNewError)).toHaveText(errorMessage);
    });

    await test.step('Điền thông tin tag: name = lesson tag, click button Add New Tag', async () => {
      await page.fill((xpathPost.xpathUserName), 'lesson tag');
      await page.click(xpathPost.addNewTagButton);
      await expect(page.locator(xpathPost.existNameError)).toBeVisible();
      await expect(page.locator(xpathPost.existNameError)).toHaveText(errorExistName);
    });
  });

  test('POST_TAG_002 - Tag- add tag success', async ({ page }) => {
    await test.step('Điền thông tin tag: name, name là tên bạn và click button Add New Tag', async () => {
      await page.fill((xpathPost.xpathUserName), tagName);
      await page.inputValue(xpathPost.xpathUserName);
      await page.click(xpathPost.addNewTagButton);
      await expect(page.locator(xpathPost.addNewSuccess)).toBeVisible();
      await expect(page.locator(xpathPost.addNewSuccess)).toContainText(successMessage);
      await expect(page.locator(xpathPost.newTag)).toContainText(tagName);
    });
  })
})