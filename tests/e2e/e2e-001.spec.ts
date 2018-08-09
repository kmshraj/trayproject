import { ElementFinder, WebDriver, browser, by, element, protractor } from 'protractor';
import { PASSWORDS, USERS } from '../../tray-credentials/UserAndPass';

import { Landing } from '../pageObjects/Landing.page';
import { LogTraceFor } from '../utils/TrayLogs';
import { Login } from '../pageObjects/Login.page';

describe(' End to  End User flow to create a flow and delete it ', () => {
    beforeAll(() => {
      console.log('** BEFORE ALL - I AM LOGIN AS Tray user');
      browser.ignoreSynchronization = true;
      browser.get("https://app.tray.io/login")
    });

    it('Login with user credentials', () => {
      console.log('Login with valid user');
      Login.loginWithCredential(USERS.CUSTOMUSER, PASSWORDS.CUSTOMPASSWORD);
    });
    it('Check Dashboard and landing page loaded', () => {
        console.log('Avatar to be displayed');
        Landing.landingPageInitialCheck();
      });

    it('Create Workflow from CreateNewWorkFlow and click on Cancel Button', () => {
        Landing.createNewWorkFlow();
        Landing.cancelWorkFlow();
      });

    it('Create Workflow from Create WorkFlow Button at bottom and click on Cancel Button', () => {
        Landing.createWorkFlowFromButton();
        Landing.cancelWorkFlow();
      });

    it('Create Workflow without WorkflowName and capture error', () => {
        Landing.createWorkFlowWithoutNameCaptureError()
      });
    it('Create Workflow with Name', () => {
        Landing.createWorkFlow("raj")
        console.log("let")
        Landing.close.click();
        Landing.checkWorkFlowDisplayed("raj")
      });
    it('Delete Workflow with Name', () => {
        Landing.deleteWorkFlow()
    });
    afterAll(() => {
      console.log('afterAll');

    });
  });
