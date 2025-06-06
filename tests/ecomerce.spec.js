import { test, expect } from '@playwright/test';
import { SiginPage } from '../Pages/SiginPage.js';
import { LoginPage } from '../Pages/LoginPage.js';
import testData from '../data/testData.json';
import { assert } from 'console';

test.use({
  ignoreHTTPSErrors: true
});

function runTests(data) {
  test(`sign in ${data.email}`, async function ({ page }) {
     
    const signinPage = new SiginPage(page);
    
    await signinPage.goto();  //primero voy a la pagina ecomerce
    await expect(signinPage.gotohome).toContainText('Featured');
    await signinPage.Gotosigin(); //luego voy a la pagina de signin
    await expect(signinPage.expectedform).toContainText('Your Personal Details');
    await signinPage.Fillform(data); //primero realizo el signin
    await expect(page.locator('#content')).toContainText(/Congratulationss! Your new account has been successfully created!/);
    await expect(page.locator('#content')).toHaveText(/Congratulations!/i);

  });

  test(`login/out ${data.email}`, async function ({ page }) {
    // Wait for the URL to contain 'login' and assert it
    const loginPage = new LoginPage(page); 
    const signinPage = new SiginPage(page);
    await signinPage.goto(); // voy a la pagina de login
    await expect(signinPage.gotohome).toContainText('Featured');
    await loginPage.gotologinPage();
    await expect(page).toHaveURL(/login/); // verifico que estoy en la pagina de login
    await loginPage.login(data.email, data.password); // realizo el login
    await expect(page.locator('#column-right')).toContainText('Logout'); // espero que el login haya sido exitoso
    await loginPage.logout(); // me deslogueo
    await expect(page.locator('#content')).toContainText('You have been logged off your account. It is now safe to leave the computer.');
  });
}

testData.forEach(runTests);