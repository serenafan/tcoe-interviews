const HomeScreen = require("../screenobjects/screens/HomeScreen");
const TabBar = require("../screenobjects/components/TabBar");
const FormScreen = require("../screenobjects/screens/FormScreen");
const Keyboard = require("../screenobjects/components/Keyboard");
const Alert = require("../screenobjects/components/Alert");
const {
  parseJsontestData,
} = require("../../../../utilities/parseJsonFromFile");

const testData = parseJsontestData(
  "scenarios/androidplayground/tests/testData/test_data_form_input.json"
);

describe("Given user wants to check form screen behavior,", async () => {
  context("When user is on home screen", async () => {
    it("Then home tab is default selected ", async () => {
      await HomeScreen.assertElementShown();
      await TabBar.assertElementFocused(TabBar.home);
    });

    it("Then form tab is shown and clickable", async () => {
      await TabBar.assertElementShown(TabBar.form);
      await TabBar.assertElementClickable(TabBar.form);
    });

    it("Then switch to form screen when tab on", async () => {
      await TabBar.openForm();
      await FormScreen.assertElementShown();
    });
  });

  context("When user is on form screen", () => {
    testData.forEach(({ inputText, dropdownSelection, alertText }) => {
      it(`Then user is able to input '${inputText}'`, async () => {
        await FormScreen.inputText(inputText);
        await Keyboard.waitForKeyboardShown();
        await Keyboard.assertKeyboardShown();
        await FormScreen.assertInputboxText(inputText);
        await Keyboard.hideKeyboard();
      });

      it(`Then user can select '${dropdownSelection}' from drop down`, async () => {
        await FormScreen.tapDropdown();
        await FormScreen.assertAllOptionsShown();
        await FormScreen.assertDropdownOptionCount(3);
        await FormScreen.selectOptionWithText(dropdownSelection);
        await FormScreen.assertDropdownText(dropdownSelection);
      });

      it("Then user can click on active button to trigger alert", async () => {
        await FormScreen.clickActiveBtn();
        await Alert.assertAlertText(alertText);
        await Alert.acceptAlert();
        await Alert.assertAlertNotDisplay();
      });
    });

    it("Then Inavtive button is not interactable", async () => {
      await FormScreen.assertElementClickable(FormScreen.inActiveButton);
    });
  });
});
