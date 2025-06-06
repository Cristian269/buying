import { expect } from '@playwright/test';
import log from 'loglevel';

class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
    this.accountlink = page.getByRole ('link',{name:' My Account'});
    this.tologinpagelink = page.getByRole('link',{ name:'Login' });
    log.setLevel('info'); // Set log level to info
}
    async gotologinPage() {
    await this.accountlink.click();
    await this.tologinpagelink.click();
    log.info('Navigated to login page');
    }
 

    async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    log.info('Login button clicked');
  }

  async logout() {
    log.info('Attempting to log out');
    await this.logoutButton.click();
    log.info('Logout button clicked');
  }
}

export { LoginPage };
