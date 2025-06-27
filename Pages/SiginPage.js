import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/es';
import log from 'loglevel';

class SiginPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByRole('textbox', { name: '* First Name' });
    this.lastName = page.getByRole('textbox', { name: '* Last Name' });
    this.email = page.getByRole('textbox', { name: '* E-Mail' });
    this.telephone = page.getByRole('textbox', { name: '* Telephone' });
    this.password = page.getByRole('textbox', { name: '* Password', exact: true });
    this.passwordconfirm = page.getByRole('textbox', { name: '* Password Confirm' });
    this.suscribecheck = page.getByRole('radio', { name: 'Yes' });
    this.privacycheck = page.getByRole('checkbox');
    this.myaccount = page.getByRole('link', { name: ' My Account' });
    this.combobox = page.locator('#top-links').getByRole('link', { name: 'My Account', exact: true });
    this.register = page.getByRole('link', { name: 'Register' });
    this.gotohome = page.locator('#content').getByRole('heading', { name: 'Featured' });
    this.expectedform = page.getByText('Your Personal Details')
    this.buttonform = page.getByRole('button', { name: 'Continue' });
    
  }

  async goto() {
    await this.page.goto('https://opencart.abstracta.us/');
  }

  async Gotosigin() {
    await this.myaccount.click();
    await  this.register.click();
    log.info('Attempting to log in with email:', this.email);
  }
  

  async Fillform(data) {
    await this.firstName.fill(data.firstName);
    await log.info('Filling first name:', data.firstName);
    await this.lastName.fill(data.lastName);
    await log.info('Filling last name:', data.lastName);
    await this.email.fill(data.email);
    await log.info('Filling email:', data.email);
    await this.telephone.fill(data.telephone);
    await log.info('Filling telephone:', data.telephone);
    await this.password.fill(data.password);
    await log.info('Filling password:', data.password);
    await this.passwordconfirm.fill(data.password);
    await this.suscribecheck.check();
    await this.privacycheck.click();
    await this.buttonform.click(); 
  }
  
}

export { SiginPage };
