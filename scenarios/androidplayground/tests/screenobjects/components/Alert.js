const expectChai = require("chai").expect;

class Alert {
  // define selectors as class properties
  get alertTitle() {
    return $("id=android:id/alertTitle");
  }

  /**
   * get alert text from alert popup
   * @returns alert text
   */
  async getAlertContent() {
    return await driver.getAlertText();
  }

  /**
   * accept alert
   */
  async acceptAlert() {
    await driver.acceptAlert();
  }

  /**
   * assertions on alert text to be as expected
   * @param alertText expected alert text
   */
  async assertAlertText(alertText) {
    expectChai(await this.getAlertContent()).to.include(alertText);
  }

  /**
   * assertions alert to not display any more
   */
  async assertAlertNotDisplay() {
    await expect(this.alertTitle).not.toBeDisplayed();
  }
}

module.exports = new Alert();
