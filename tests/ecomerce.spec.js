import { test, expect } from '@playwright/test';

import { LoginPage } from '../Pages/LoginPage.js';
import testData from '../data/testData.json';

test.use({
  ignoreHTTPSErrors: true
});

function runTests(data) {
  test(`sign in ${data.email}`, async function ({ page }) {
   
    //await signinPage.goto();
    await signinPage.Gotosigin();  //primero voy a la pagina de registro
    await expect(page.locator('#content')).toContainText('Register Account');// esto lo detecto la ia
    await signinPage.Fillform(data); //primero realizo el signin
    await expect(page.locator('#content')).toContainText('Congratulations! Your new account has been successfully created!');
  });

  test(`login/out ${data.email}`, async function ({ page }) {
    const loginPage = new LoginPage(page); 
    await loginPage.logout(); // me deslogueo
    await expect(page.locator('#content')).toContainText('You have been logged off your account. It is now safe to leave the computer.');
    await loginPage.login(data.email, data.password); // realizo el login
    await expect(page.getByRole('heading', { name: 'My Account' })).toBeVisible();
  });
}

testData.forEach(runTests);