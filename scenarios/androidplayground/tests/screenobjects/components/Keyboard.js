const expectChai = require("chai").expect;
class Keyboard {
  /**
   * to check if keyboard is shown
   * @returns "true" or "false"
   */
  async isKeyboardShown() {
    return await driver.isKeyboardShown();
  }

  /**
   * wait for keyboard to show
   */
  async waitForKeyboardShown() {
    await driver.waitUntil(async () => await this.isKeyboardShown(), {
      timeout: 50000,
    });
  }

  /**
   * hide keyboard
   */
  async hideKeyboard() {
    await driver.hideKeyboard();
  }

  /**
   * assert keyboard is shown or not depend on isSHown parameter sent in
   */
  async assertKeyboardShown(isShown = true) {
    const isKeyboardShown = await this.isKeyboardShown();
    if (isShown) {
      expectChai(isKeyboardShown).to.be.true;
    } else {
      expectChai(isKeyboardShown).to.be.false;
    }
  }
}

module.exports = new Keyboard();
