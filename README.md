# testkit Reporter for Cypress

## Note: TestKit is in active development visit https://github.com/Abdoul/testkit for more details

[![version](https://img.shields.io/npm/v/cypress-testkit-reporter.svg)](https://www.npmjs.com/package/cypress-testkit-reporter)
[![downloads](https://img.shields.io/npm/dt/cypress-testkit-reporter.svg)](https://www.npmjs.com/package/cypress-testkit-reporter)
[![MIT License](https://img.shields.io/github/license/Vivify-Ideas/cypress-testkit-reporter.svg)](https://github.com/Vivify-Ideas/cypress-testkit-reporter/blob/master/LICENSE.md)

Publishes [Cypress](https://www.cypress.io/) runs on testkit.

## Install

```shell
$ npm install cypress-testkit-reporter --save-dev
```

## Usage

Add reporter to your `cypress.json`:

```json
...
"reporter": "cypress-testkit-reporter",
"reporterOptions": {
  "domain": "yourdomain.testkit.com",
  "username": "username",
  "password": "password",
  "projectId": 1,
  "suiteId": 1,
}
```

Your Cypress tests should include the ID of your testkit test case. Make sure your test case IDs are distinct from your test titles:

```Javascript
// Good:
it("C123 C124 Can authenticate a valid user", ...
it("Can authenticate a valid user C321", ...

// Bad:
it("C123Can authenticate a valid user", ...
it("Can authenticate a valid userC123", ...
```

If no TestKit ID is provided, it will be created automatically by TestKit by the name of the test

## Reporter Options

**domain**: _string_ domain name of your testkit instance (e.g. for a hosted instance _instance.testkit.com_).

**username**: _string_ email of the user under which the test run will be created.

**password**: _string_ password or the API key for the aforementioned user.

**projectId**: _number_ project with which the tests are associated.

**suiteId**: _number_ suite with which the tests are associated.

**runName**: _string_ (optional) name of the testkit run.

**includeAllInTestRun**: _bool_ (optional: default is true) will return all test cases in test run. set to false to return test runs based on filter or section/group.

**groupId**: _string_ (optional: needs "includeAllInTestRun": false ) The ID of the section/group

**filter**: _string_ (optional: needs "includeAllInTestRun": false) Only return cases with matching filter string in the case title

## testkit Settings

To increase security, the testkit team suggests using an API key instead of a password. You can see how to generate an API key [here](http://docs.gurock.com/testkit-api2/accessing#username_and_api_key).

If you maintain your own testkit instance on your own server, it is recommended to [enable HTTPS for your testkit installation](http://docs.gurock.com/testkit-admin/admin-securing#using_https).

For testkit hosted accounts maintained by [Gurock](http://www.gurock.com/), all accounts will automatically use HTTPS.

You can read the whole testkit documentation [here](http://docs.gurock.com/).

## Author

Abdoul Sy - [github](https://github.com/AbdoulSy)

## License

This project is licensed under the [MIT license](/LICENSE.md).

## Acknowledgments

- [Milutin Savovic](https://github.com/mickosav), owner of the [cypress-testrail-reporter](https://github.com/mickosav/cypress-testrail-reporter) repository that was forked.
