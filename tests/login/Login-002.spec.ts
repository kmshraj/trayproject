import { ElementFinder, WebDriver, browser, by, element, protractor } from 'protractor';
import { PASSWORDS, USERS } from '../../tray-credentials/UserAndPass';

import { Landing } from '../pageObjects/Landing.page';
import { LogTraceFor } from '../utils/TrayLogs';
import { Login } from '../pageObjects/Login.page';
import { Logout } from '../pageObjects/Logout.page';

describe('Login with invalid user ', () => {
    beforeAll(() => {
      console.log('** BEFORE ALL - I AM LOGIN AS Tray user');
      browser.ignoreSynchronization = true;
      browser.get("https://app.tray.io/login")
    });

    it('Login with invalid user credentials', () => {
      console.log('Login with valid user');
      Login.loginWithCredential(USERS.INVALIDUSER, PASSWORDS.CUSTOMPASSWORD)
      expect<any>(Login.loginError.getText()).toBe("Invalid email or password");
    });
  });
