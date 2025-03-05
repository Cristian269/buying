
const { expect } = require('@playwright/test');
module.exports = { SiginPage};
class SiginPage {
    
    Constructor(page){
    this.page = page;
    this.firstName = page.getByRole('textbox', { name: '* First Name' });
    this.lastName = page.getByRole('textbox', { name: '* Last Name' });
    this.email = page.getByRole('textbox', { name: '* E-Mail' });
    this.telephone = page.getByRole('textbox', { name: '* Telephone' });
    this.password = page.getByRole('textbox', { name: '* Password' });
    this.passwordconfirm = page.getByRole('textbox', { name: '* Password Confirm' });
    this.suscribecheck = page.getByRole('radio', { name: 'Yes' });
    this.privacycheck = page.getByRole('button',{name: 'Continue'})
    }
    
    async Gotosigin(){
        await this.page.goto('https://opencart.abstracta.us/');
        await this.page.getByRole('link', { name: ' My Account' }).click();
        await this.page.getByRole('link', { name: 'Register' }).click();
    }

    async Fillform(data){
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.email.fill(data.email);
        await this.telephone.fill(data.telephone);
        await this.password.fill(data.password);
        await this.passwordconfirm.fill(data.password);
        await this.suscribecheck.check();
        await this.privacycheck.click();
    }

}