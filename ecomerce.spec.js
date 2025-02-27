import { test, expect } from '@playwright/test';

const testData = [
  {
    firstName: 'maria',
    lastName: 'baca',
    email: 'mbaca@gmail.com',
    telephone: '2614557788',
    password: 'mbaca10'
  },
  {
    firstName: 'carl',
    lastName: 'smith',
    email: 'csmith@example.com',
    telephone: '1234567890',
    password: 'password123'
  },
    {
    firstName: 'Victor manuel',
    lastName: 'Diaz',
    email: 'vmdiaz@example.com',
    telephone: '1234567890',
    password: 'password123'
  }
];

test.use({
  ignoreHTTPSErrors: true
});

testData.forEach((data) => {
  test(`sign in and login for ${data.email}`, async ({ page }) => {
    await page.goto('https://opencart.abstracta.us/');
    await page.getByRole('link', { name: ' My Account' }).click();
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByRole('textbox', { name: '* First Name' }).fill(data.firstName);
    await page.getByRole('textbox', { name: '* Last Name' }).fill(data.lastName);
    await page.getByRole('textbox', { name: '* E-Mail' }).fill(data.email);
    await page.getByRole('textbox', { name: '* Telephone' }).fill(data.telephone);
    await page.getByRole('textbox', { name: '* Password', exact: true }).fill(data.password);
    await page.getByRole('textbox', { name: '* Password Confirm' }).fill(data.password);
    await page.getByRole('radio', { name: 'Yes' }).check();
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.locator('#content')).toContainText('Congratulations! Your new account has been successfully created!');
    await page.getByRole('link', { name: ' My Account' }).click();
    await page.locator('#top-links').getByRole('link', { name: 'My Account', exact: true }).click();
    
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.locator('#content')).toContainText('You have been logged off your account. It is now safe to leave the computer.');
    await page.getByRole('link', { name: ' My Account' }).click();
    await page.locator('#top-links').getByRole('link', { name: 'Login' }).click();
    await expect(page.locator('#content')).toContainText('I am a returning customer');
    await page.getByRole('textbox', { name: 'E-Mail Address' }).fill(data.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();
  });
});