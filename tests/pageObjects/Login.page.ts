import { ElementFinder, browser, by, element, protractor } from 'protractor';

import { LogTraceFor } from '../utils/TrayLogs';

const EC = protractor.ExpectedConditions;

export class Login {
    static username: ElementFinder = element(by.css('[name="username"]'));
    static password: ElementFinder = element(by.css('[name="password"]'));
    static login: ElementFinder = element(by.css('button[type="submit"]'));
    static cookieBanner: ElementFinder = element(by.css('[id="adroll_consent_banner]'))
    static cookieAllow: ElementFinder = element(by.css('[id="adroll_allow"]'))
    static loginError: ElementFinder = element (by.css('div.Errors___2QZbbr'))

    static loginWithCredential(user, password) {
        console.log('** USER TO LOGIN: ' + user + ' **');
        this.username.isDisplayed()
        this.username.sendKeys(user).then(() => {
            this.password.isEnabled().then((login) => {
               this.password.sendKeys(password)
               this.login.click()
            }).catch((e) => {
                LogTraceFor.error(e);
            });
        }).catch((e) => {
            LogTraceFor.error(e);
        })
    }

    static allowCookie() {
        if (this.cookieBanner.isDisplayed()) {
            this.cookieAllow.click()
        } else {
            console.log("No Cookie Banner Present")
        }
    }

}
