import { test, expect } from '@playwright/test';
import { SiginPage }  from '../Pages/Signin.spec.js';
import { LoginPage } from '../PLogin.spec.js';

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
  test(`sign in ${data.email}`, async ({ page }) => {
    const signinPage = new SiginPage(page);
    await signinPage.Gotosigin();  //primero voy a la pagina de registro
    await expect(page.locator('#content')).toContainText('Register Account');// esto lo detecto la ia
    await signinPage.Fillform(data); //primero realizo el signin
    await expect(page.locator('#content')).toContainText('Congratulations! Your new account has been successfully created!');
  });
  test(`login/out ${data.email}`, async ({ page }) => {
  
    const loginPage = new LoginPage(page); 
    await LoginPage.logout(); // me deslogueo
    await expect(page.locator('#content')).toContainText('You have been logged off your account. It is now safe to leave the computer.');
    await loginPage.login(data.email, data.password); // realizo el login
    await expect(page.locator('#content').getByRole('heading', { name: 'My Account' })).toBeVisible();
  });
 
});