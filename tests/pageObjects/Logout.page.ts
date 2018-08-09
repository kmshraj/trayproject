import { ElementFinder, browser, by, element, protractor } from 'protractor';

import { Landing } from '../pageObjects/Landing.page';
import { LogTraceFor } from '../utils/TrayLogs';

export class Logout {

    static logout: ElementFinder = element(by.css('[href="/logout"]'));

    static logoutuser() {
        console.log('** USER Loggedout');
        Landing.avatar.isDisplayed()
        Landing.avatar.click().then(() => {
            this.logout.click();
        }).catch((e) => {
            LogTraceFor.error(e);
        })
    }

}
