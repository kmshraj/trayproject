import { DisplayProcessor, SpecReporter } from 'jasmine-spec-reporter';

import { Config } from 'protractor';

import SuiteInfo = jasmine.SuiteInfo;

export const config: Config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'https://app.tray.io/login',
    capabilities: {
		browserName: 'chrome',
		prefs: {
			// disable chrome's annoying password manager
			profile: {
				default_content_settings: {
					cookies: 1,
				}
			}
		},
        // chromeOptions: {
        // // args: ['--headless']
        // },
      exclude: [ '', '', '' ],
    },
	  framework: 'jasmine',
	  //directConnect: true,
	  specs: [ './tests/**/Login-002.spec.js' ],
	  jasmineNodeOpts: {
		  defaultTimeoutInterval: 2000000,
		  showColors: true
	  },
	  noGlobals: true,

	  onPrepare: () => {
		  const globals = require('protractor');
		  const browser = globals.browser;
		  browser.manage().window().maximize();
		  browser.manage().timeouts().implicitlyWait(10000);
		  const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
		  const JasmineReporters = require('jasmine-reporters');
		  jasmine.getEnv().addReporter(
			  new SpecReporter({
				customProcessors: [ CustomProcessor ],
				prefixes: { successful: ' 🍻  -> ', failed: ' 🔥  -> ' }
			})
		  );
		  jasmine.getEnv().addReporter(
			new Jasmine2HtmlReporter({
				savePath: 'TResults',
				screenshotsFolder: 'images',
				fileNameDateSuffix: true,
				cleanDestination: true,
				takeScreenshots: true,
				takeScreenshotsOnlyOnFailures: true,
				consolidate: true,
				consolidateAll: true
			})
		  );
		  jasmine.getEnv().addReporter(
			new JasmineReporters.JUnitXmlReporter({
				// JUnit
				savePath: 'TResults/junit',
				consolidateAll: false
			})
		  );
	  },

	  afterLaunch: (exitCode) => {
		console.log('exit code is' + exitCode);
	  },

	  suites: {
		 E2E: ['tests/e2e/*.js'],
	  }
};

  class CustomProcessor extends DisplayProcessor {
	  public displayJasmineStarted(info: SuiteInfo, log: string): string {
		  return `TypeScript ${log}`;
	  }
  }
