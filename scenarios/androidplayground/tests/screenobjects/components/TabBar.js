const AppScreen = require("../screens/AppScreen");

class TabBar extends AppScreen {
  // define selectors as class properties
  get home() {
    return $("~Home");
  }

  get form() {
    return $("~Forms");
  }

  /**
   * Tap on home button on tabbar
   */
  async openHome() {
    await super.clickElement(this.home);
  }

  /**
   * Tap on open button on tabbar
   */
  async openForm() {
    await super.clickElement(this.form);
  }
}

module.exports = new TabBar();
