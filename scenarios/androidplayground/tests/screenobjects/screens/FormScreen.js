const AppScreen = require("./AppScreen");
const expectChai = require("chai").expect;

class FormScreen extends AppScreen {
  constructor() {
    super("~Forms-screen");
  }

  // define selectors as class properties
  get input() {
    return $("~text-input");
  }

  get inputTextResult() {
    return $("~input-text-result");
  }

  get dropDown() {
    return $("~Dropdown");
  }

  get dropdownText() {
    return $(
      "//android.view.ViewGroup[@content-desc='Dropdown']/android.view.ViewGroup/android.widget.EditText"
    );
  }

  get activeButton() {
    return $("~button-Active");
  }

  get inActiveButton() {
    return $("~button-Inactive");
  }

  get pickerOptions() {
    return $$(
      "//android.widget.CheckedTextView[@resource-id='android:id/text1']"
    );
  }

  /**
   * Input text into inputbox
   */
  async inputText(value) {
    await super.clickElement(this.input);
    await super.inputValue(this.input, value);
  }

  /**
   * tap on dropdown to open dropdown options
   */
  async tapDropdown() {
    await super.clickElement(this.dropDown);
  }

  /**
   * click on active button
   */
  async clickActiveBtn() {
    await super.clickElement(this.activeButton);
  }

  /**
   * select drop down option by text given
   */
  async selectOptionWithText(text) {
    const el = $(`//*[matches(@text,'${text}')]`);
    await super.clickElement(el);
  }

  /**
   * assert drop down text to be expected selection
   */
  async assertDropdownText(text) {
    await super.assertElTextToBe(this.dropdownText, text);
  }

  /**
   * assert total number of drop down options to be expected
   */
  async assertDropdownOptionCount(number) {
    await super.assertElementCountToBe(this.pickerOptions, number + 1);
  }

  /**
   * assert input box text to be expected input text
   */
  async assertInputboxText(inputText) {
    await super.assertElTextToBe(this.inputTextResult, inputText);
  }

  /**
   * assert all options should be displayed in screen
   */
  async assertAllOptionsShown() {
    await this.pickerOptions.forEach(async (option) => {
      await super.waitForShown(option);
    });
  }
}

module.exports = new FormScreen();
