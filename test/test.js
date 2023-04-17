const wdio = require("webdriverio");

username =
  process.env.LT_USERNAME == undefined
    ? "mateo.escobar"
    : process.env.LT_USERNAME;
accesskey =
  process.env.LT_ACCESS_KEY == undefined
    ? "sRgAJPwFlAVlEoE08U8QPTql81fFquwOB8viuIKQwjG5nTk7c5"
    : process.env.LT_ACCESS_KEY;

desiredCaps = {
  "platformName": "android",
	"deviceName": "Galaxy S22 5G",
	"platformVersion": "13",
	"app": "lt://APP10160621161670299552189217",
	"build": "test",
	"name": "test",
	"project": "sc",
	"isRealMobile": true
};
driver = wdio.promiseRemote(`https://${username}:${accesskey}@mobile-hub.lambdatest.com/wd/hub`);

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementByResourceId('email-input', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (emailInput) {
    return emailInput.sendKeys("login@test.com");
  })
  .then(function () {
    return driver.waitForElementByResourceId('continue-button', asserters.isDisplayed && asserters.isEnabled, 30000);
  })
  .then(function (continueButton) {
    return continueButton.click()
  })
  .then(function () {
    return driver.waitForElementByResourceId('password-input', asserters.isDisplayed && asserters.isEnabled, 30000)
  })
  .then(function (passwordInput) {
    return passwordInput.sendKeys('Password123&')
  })
  .then(function (loginButton) {
    return loginButton.click()
  })
  .fin(function() { return driver.quit(); })
  .done();
