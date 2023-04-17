import wdio from 'webdriverio';

const desiredCaps = {
  "platformName" : "android",
  "appium:platformVersion" : "12.0",
  "appium:deviceName" : "Samsung Galaxy S22 Ultra",
  'bstack:options' : {
  "userName" : "mateoescobar_XBG94T",
  "accessKey" : "s8yyxkCqfjx9Mkqzfq22",
  },
  };
const driver = wdio.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");

driver
  .init(desiredCaps)
  .then(function () {
    return driver.waitForElementById('email-input', 30000);
  })
  .then(function (emailInput) {
    return emailInput.sendKeys("login@test.com");
  })
  .then(function () {
    return driver.waitForElementById('continue-button', 30000);
  })
  .then(function (continueButton) {
    return continueButton.click()
  })
  .then(function () {
    return driver.waitForElementById('password-input', 30000)
  })
  .then(function (passwordInput) {
    return passwordInput.sendKeys('Password123&')
  })
  .then(function (loginButton) {
    return loginButton.click()
  })
  .fin(function() { return driver.quit(); })
  .done();