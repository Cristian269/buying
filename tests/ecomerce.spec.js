import { test, expect } from '@playwright/test';
import { SiginPage } from '../Pages/SiginPage.js';
import { LoginPage } from '../Pages/LoginPage.js';
import { createRandomUser } from '../Pages/utils/userFactory.js';

test.use({
  ignoreHTTPSErrors: true
});

test('sign in y login dinámico', async ({ page }) => {
  //sigin in 
  const usuario = createRandomUser();
  const signinPage = new SiginPage(page);
  await signinPage.goto();
  await expect(signinPage.gotohome).toContainText('Featured');
  await signinPage.Gotosigin();
  await expect(signinPage.expectedform).toContainText('Your Personal Details');
  await signinPage.Fillform(usuario);
  await expect(page.locator('#content')).toHaveText(/Congratulations!/i);

  // Login con el usuario recién creado
  const loginPage = new LoginPage(page);
  await signinPage.goto();
  await expect(signinPage.gotohome).toContainText('Featured');
  await loginPage.logout();
  await expect(page.locator('#content')).toContainText('You have been logged off your account. It is now safe to leave the computer.');
  await loginPage.gotologinPage();
  await expect(page).toHaveURL(/login/);
  await loginPage.login(usuario.email, usuario.password);
  await expect(page.locator('#column-right')).toContainText('Logout');
  
});