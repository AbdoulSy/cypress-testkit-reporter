import { reporters } from 'mocha';
import * as moment from 'moment';
import { TestKit } from './testkit';
import { titleToCaseIds } from './shared';
import { Status, TestKitResult } from './testkit.interface';
const chalk = require('chalk');

export class CypressTestKitReporter extends reporters.Spec {
  private results: TestKitResult[] = [];
  private testKit: TestKit;

  constructor(runner: any, options: any) {
    super(runner);

    let reporterOptions = options.reporterOptions;
    this.testKit = new TestKit(reporterOptions);
    this.validate(reporterOptions, 'domain');
    this.validate(reporterOptions, 'username');
    this.validate(reporterOptions, 'password');
    this.validate(reporterOptions, 'projectId');
    this.validate(reporterOptions, 'suiteId');

    runner.on('start', () => {
      const executionDateTime = moment().format('MMM Do YYYY, HH:mm (Z)');
      const name = `${reporterOptions.runName || 'Automated test run'} ${executionDateTime}`;
      const description = 'For the Cypress run visit https://dashboard.cypress.io/#/projects/runs';
      this.testKit.createRun(name, description);
    });

    runner.on('pass', test => {
      const caseIds = titleToCaseIds(test.title);
      if (caseIds.length > 0) {
        const results = caseIds.map(caseId => {
          return {
            case_id: caseId,
            status_id: Status.Passed,
            comment: `Execution time: ${test.duration}ms`,
          };
        });
        this.results.push(...results);
      }
    });

    runner.on('fail', test => {
      const caseIds = titleToCaseIds(test.title);
      if (caseIds.length > 0) {
        const results = caseIds.map(caseId => {
          return {
            case_id: caseId,
            status_id: Status.Failed,
            comment: `${test.err.message}`,
          };
        });
        this.results.push(...results);
      }
    });

    runner.on('end', () => {
      if (this.results.length == 0) {
        console.log('\n', chalk.magenta.underline.bold('(TestKit Reporter)'));
        console.warn(
          '\n',
          'No testcases were matched. Ensure that your tests are declared correctly and matches Cxxx',
          '\n'
        );
        this.testKit.deleteRun();

        return;
      }

      // publish test cases results & close the run
      this.testKit.publishResults(this.results)
        .then(() => this.testKit.closeRun());
    });
  }

  private validate(options, name: string) {
    if (options == null) {
      throw new Error('Missing reporterOptions in cypress.json');
    }
    if (options[name] == null) {
      throw new Error(`Missing ${name} value. Please update reporterOptions in cypress.json`);
    }
  }
}
