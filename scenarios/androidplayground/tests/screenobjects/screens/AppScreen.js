const expectChai = require("chai").expect;
module.exports = class AppScreen {
  constructor(screenSelector) {
    this.screenSelector = screenSelector;
  }

  /**
   * get element attribute if clickable or not
   * @param element element on the screen
   * @returns "true" or "false"
   */
  async isElClickable(element) {
    return await element.getAttribute("clickable");
  }

  /**
   * get element attribute if focused or not
   * @param element element on the screen
   * @returns "true" or "false"
   */
  async isElFocused(element) {
    return await element.getAttribute("focusable");
  }

  /**
   * wait for screen element or regular element shown or not shown depend on parameter isShown
   * @param element element on the screen, default to screen element
   * @param isShown to wait for shown or not shown
   */
  async waitForShown(element = $(this.screenSelector), isShown = true) {
    return await element.waitForDisplayed({
      reverse: !isShown,
    });
  }

  /**
   * wait for element to be clickable
   * @param element element on the screen
   */
  async waitForClickable(element) {
    await driver.waitUntil(async () => await this.isElClickable(element), {
      timeout: 5000,
    });
  }

  /**
   * click element that is clickable
   * @param element element on the screen
   */
  async clickElement(element) {
    await this.waitForClickable(element);
    await element.click();
  }

  /**
   * input value to inputbox
   * @param element element on the screen
   * @param value value to input
   */
  async inputValue(element, value) {
    await this.waitForShown(element);
    await element.setValue(value);
  }

  /**
   * get text from element
   * @param element element on the screen
   * @returns element text
   */
  async getElementText(element) {
    await this.waitForShown(element);
    return await element.getText();
  }

  /**
   * get element count from a list of elements
   * @param element element on the screen
   * @returns elements list count
   */
  async getElementCount(elements) {
    return await elements.length;
  }

  /**
   * assertion on element is shown or not depend on isShown flag
   * @param element element on the screen, set default to screen selector
   * @param isShown to check element is shown or not shown
   */
  async assertElementShown(element = $(this.screenSelector), isShown = true) {
    await this.waitForShown(element, isShown);
    if (isShown) {
      await expect(element).toBeDisplayed();
    } else {
      await expect(element).not.toBeDisplayed();
    }
  }

  /**
   * assertion on element is clickable or not depend on isClickable flag
   * @param element element on the screen
   * @param isClickable to check element is clickable or not clickable
   */
  async assertElementClickable(element, isClickable = true) {
    const getAttClickable = await this.isElClickable(element);
    if (isClickable) {
      expectChai(getAttClickable).to.equal("true");
    } else {
      expectChai(getAttClickable).to.not.equal("true");
    }
  }

  /**
   * assertion on element is focused or not depend on isFocused flag
   * @param element element on the screen
   * @param isFocused to check element is focused or not focused
   */
  async assertElementFocused(element, isFocused = true) {
    const getAttFocused = await this.isElFocused(element);
    if (isFocused) {
      expectChai(getAttFocused).to.equal("true");
    } else {
      expectChai(getAttFocused).to.not.equal("true");
    }
  }

  /**
   * assertion on element text is shown as expected
   * @param element element on the screen
   * @param text expected text
   */
  async assertElTextToBe(element, text) {
    const inputText = await this.getElementText(element);
    expectChai(inputText).to.equal(text);
  }

  /**
   * assertion on elements count is as expected
   * @param elements elements on the screen
   * @param expectedCount expected count
   */
  async assertElementCountToBe(elements, expectedCount) {
    const actualCount = await this.getElementCount(elements);
    expectChai(actualCount).to.equal(expectedCount);
  }
};
