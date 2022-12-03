const { default: ChromeDriverService } = require("wdio-chromedriver-service");
const Page = require("./page");
const expectchai = require("chai").expect;

class SearchResultPage extends Page {
  /**
   * define selectors using getter methods
   */
  get searchInput() {
    return $(".search__input");
  }

  get resultCountText() {
    return $(".search__results-count");
  }

  get resultList() {
    return $(".search__results-list");
  }

  get headlines() {
    return $$("[data-editable ='headline']");
  }

  get noResultTitle() {
    return $(".search__no-results__title");
  }

  get noResultSuggests() {
    return $(".search__no-results__suggestions");
  }

  get searchClearBtn() {
    return $(".search__clear");
  }

  /**
   * clear search result
   */
  async ClearSearch() {
    await super.clickElement(this.searchClearBtn);
  }

  async assertSearchResultShown() {
    expect(await super.getVisibleElement(this.resultList)).toBeDisplayed();
  }

  /**
   * This method assert headlines in result list contains keyword that was searched
   */
  async assertHeadlineHasKeyword(keyword) {
    const includeKeyword = (await this.headlines).some(async (headline) => {
      (await super.getElementText(headline)).includes(keyword);
    });
    expectchai(includeKeyword).to.be.true;
  }

  /**
   * This method assert result count text contains keyword that was searched
   */
  async assertResultCountHasKeyword(keyword) {
    const resultCount = await super.getElementText(this.resultCountText);
    const isInclude = resultCount.includes(keyword) ? true : false;
    expectchai(isInclude).to.be.true;
  }

  /**
   * This method assert title message correctness when no result is found after search
   */
  async assertNoResultTitleText(expectedResultMsg) {
    const noResultTitle = await super.getElementText(this.noResultTitle);
    expectchai(noResultTitle).to.have.string(expectedResultMsg);
  }

  /**
   * This method asserts suggestion text is shown when no result is found after search
   */
  async assertNoResultSuggestsShown() {
    expect(
      await super.getVisibleElement(this.noResultSuggests)
    ).toBeDisplayed();
  }

  /**
   * This method asserts search input is cleared after click clear button
   */
  async assertSearchInputCleared() {
    expectchai(await super.getValue(this.searchInput)).to.be.empty;
  }
}

module.exports = new SearchResultPage();
