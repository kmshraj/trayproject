import { ElementFinder, WebDriver, browser, by, element, protractor } from 'protractor';
import { PASSWORDS, USERS } from '../../tray-credentials/UserAndPass';

import { Landing } from '../pageObjects/Landing.page';
import { LogTraceFor } from '../utils/TrayLogs';
import { Login } from '../pageObjects/Login.page';
import { Logout } from '../pageObjects/Logout.page';

describe('Login ', () => {
    beforeAll(() => {
      console.log('** BEFORE ALL - I AM LOGIN AS Tray user');
      browser.ignoreSynchronization = true;
      browser.get("https://app.tray.io/login")
    });

    it('Login with user credentials', () => {
      console.log('Login with valid user');
      Login.loginWithCredential(USERS.CUSTOMUSER, PASSWORDS.CUSTOMPASSWORD);
    });
    it('Landing', () => {
        console.log('Avatar to be displayed');
        Landing.avatar.isDisplayed();
        Landing.dashboardHeaderTitle.isDisplayed();
        expect<any>(Landing.dashboardHeaderTitle.getText()).toBe("Dashboard");
      });
    afterAll(() => {
      console.log('afterAll');
      Logout.logoutuser();
    });
  });
