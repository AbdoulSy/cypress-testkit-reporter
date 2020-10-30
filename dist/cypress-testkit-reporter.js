"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_1 = require("mocha");
var moment = require("moment");
var testkit_1 = require("./testkit");
var shared_1 = require("./shared");
var testkit_interface_1 = require("./testkit.interface");
var chalk = require('chalk');
var CypressTestKitReporter = /** @class */ (function (_super) {
    __extends(CypressTestKitReporter, _super);
    function CypressTestKitReporter(runner, options) {
        var _this = _super.call(this, runner) || this;
        _this.results = [];
        var reporterOptions = options.reporterOptions;
        _this.testKit = new testkit_1.TestKit(reporterOptions);
        _this.validate(reporterOptions, 'domain');
        _this.validate(reporterOptions, 'username');
        _this.validate(reporterOptions, 'password');
        _this.validate(reporterOptions, 'projectId');
        _this.validate(reporterOptions, 'suiteId');
        runner.on('start', function () {
            var executionDateTime = moment().format('MMM Do YYYY, HH:mm (Z)');
            var name = (reporterOptions.runName || 'Automated test run') + " " + executionDateTime;
            var description = 'For the Cypress run visit https://dashboard.cypress.io/#/projects/runs';
            _this.testKit.createRun(name, description);
        });
        runner.on('pass', function (test) {
            var caseIds = shared_1.titleToCaseIds(test.title);
            if (caseIds.length > 0) {
                var results = caseIds.map(function (caseId) {
                    return {
                        case_id: caseId,
                        status_id: testkit_interface_1.Status.Passed,
                        comment: "Execution time: " + test.duration + "ms",
                    };
                });
                (_a = _this.results).push.apply(_a, results);
            }
            var _a;
        });
        runner.on('fail', function (test) {
            var caseIds = shared_1.titleToCaseIds(test.title);
            if (caseIds.length > 0) {
                var results = caseIds.map(function (caseId) {
                    return {
                        case_id: caseId,
                        status_id: testkit_interface_1.Status.Failed,
                        comment: "" + test.err.message,
                    };
                });
                (_a = _this.results).push.apply(_a, results);
            }
            var _a;
        });
        runner.on('end', function () {
            if (_this.results.length == 0) {
                console.log('\n', chalk.magenta.underline.bold('(TestKit Reporter)'));
                console.warn('\n', 'No testcases were matched. Ensure that your tests are declared correctly and matches Cxxx', '\n');
                _this.testKit.deleteRun();
                return;
            }
            // publish test cases results & close the run
            _this.testKit.publishResults(_this.results)
                .then(function () { return _this.testKit.closeRun(); });
        });
        return _this;
    }
    CypressTestKitReporter.prototype.validate = function (options, name) {
        if (options == null) {
            throw new Error('Missing reporterOptions in cypress.json');
        }
        if (options[name] == null) {
            throw new Error("Missing " + name + " value. Please update reporterOptions in cypress.json");
        }
    };
    return CypressTestKitReporter;
}(mocha_1.reporters.Spec));
exports.CypressTestKitReporter = CypressTestKitReporter;
//# sourceMappingURL=cypress-testkit-reporter.js.map