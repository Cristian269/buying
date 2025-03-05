const { expect } = require('@playwright/test');
module.exports = { LoginPage };
class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByPlaceholder('Correo electrónico o usuario');
      this.passwordInput = page.getByPlaceholder('Contraseña');
      this.loginButton = page.getByRole('button', { name: 'Ingresar' });
      this.linkmyaccount = page.getByRole('link', { name: ' My Account' });
      this.combobox = page.getByRole('combobox', { name: 'My Account' });
      this.logoutbutton = page.getByRole('link', { name: 'Logout' });
    }
  
    async Gototologin() {
      await this.page.goto('https://opencart.abstracta.us/login');
    }
  
    async login(username, password) {
      await this.emailInput.fill(email);
      await this.emailInput.press('Enter');
      await this.passwordInput.fill(password);
      await this.loginButton.click();
    }
    async logout(){
      
      await this.linkmyaccount.click();
      await this.combobox.click();
      await this.logoutbutton.click();
     
    }
        
}
  
  
  