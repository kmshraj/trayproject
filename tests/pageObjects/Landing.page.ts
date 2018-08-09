import { ElementFinder, browser, by, element, protractor } from 'protractor';

import { LogTraceFor } from '../utils/TrayLogs';

const EC = protractor.ExpectedConditions;

export class Landing {
    static avatar: ElementFinder = element(by.css('[id="avatar"]'));
    static dashboardHeaderTitle: ElementFinder = element(by.css('[class="Dashboard-fixed-header--title___1DThTq"]'));
    static createNewWorkflow: ElementFinder = element(by.css('[href="/create"]'));
    static createNewWorkFlowModal: ElementFinder = element(by.css('[class="modal-holder___2cAE7h"]'));
    static createWorkFlowButton: ElementFinder = element(by.css('div.Section-dashboard-container___2RnKOx a.Page-navigation-button'));
    static modalName: ElementFinder = element(by.css('[name="name"]'));
    static modalCancel: ElementFinder = element(by.css('[title="Cancel"]'));
    static modalCreate: ElementFinder = element(by.css('[title="Create"]'))
    static modalError: ElementFinder = element(by.cssContainingText('[class="modal-holder___2cAE7h"]', "The workflow name was invalid!"));
    static errorOk: ElementFinder = element(by.css('[title="Ok"]'))
    static close: ElementFinder = element(by.css('[href="/"]'));
    static workFlowName: ElementFinder = element(by.css('.Title___tbmihn'));
    static options: ElementFinder = element(by.css('.Options-menu-icon___1iiZar'));
    static delete: ElementFinder = element(by.css('.UppwardMenu___JkA7Kl > li:nth-child(5) > a:nth-child(1)'))
    static yesButton: ElementFinder = element(by.css('div.button___20IrAn:nth-child(2)'));
    static emptyWorkFlow: ElementFinder = element(by.css('.My-flows-empty___3_hU3V'));

    static createWorkFlow(name: string) {
        this.createNewWorkflow.click().then(() => {
            Landing.createNewWorkFlowModal.isDisplayed().then(() => {
                Landing.modalName.sendKeys(name).then(() => {
                    browser.sleep(5000);
                    Landing.modalCreate.click();
                    browser.sleep(6000);
                })
            })
        })

    }

    static landingPageInitialCheck() {
        Landing.avatar.isDisplayed();
        Landing.dashboardHeaderTitle.isDisplayed();
        expect<any>(Landing.dashboardHeaderTitle.getText()).toBe("Dashboard");
    }

    static createNewWorkFlow() {
        this.createNewWorkflow.click().then(() => {
            Landing.createNewWorkFlowModal.isDisplayed();
            console.log(" We are Checking for CreateNewWorkFlow button");
        })
    }
    static cancelWorkFlow() {
        Landing.modalCancel.click().then((checkEmptyFlow) => {
           this.emptyWorkFlow.isDisplayed();
           console.log(" We are Checking for Cancel button and check No workflow is shown")
        })
    }
    static createWorkFlowFromButton() {
        this.createWorkFlowButton.click().then(() => {
            Landing.createNewWorkFlowModal.isDisplayed();
            console.log(" We are Checking for CreateNewWorkFlow button");
        })
    }
    static createWorkFlowWithoutNameCaptureError() {
        this.createNewWorkFlow();
        Landing.modalCreate.click(). then ((error) => {
            Landing.modalError.isDisplayed();
        })
        Landing.errorOk.click();
        this.cancelWorkFlow();
    }
    static checkWorkFlowDisplayed(name) {
        Landing.workFlowName.isDisplayed();
        expect<any>(Landing.workFlowName.getText()).toBe(name);
    }

    static deleteWorkFlow() {
        Landing.options.click().then((select) => {
            Landing.delete.click();
        }).catch((e) => {
            LogTraceFor.error(e);
        });
        Landing.yesButton.click().then((checkdeleted) => {
            Landing.emptyWorkFlow.isDisplayed()
        })
    }
}
