const {
  parseJsontestData,
} = require("../../../../utilities/parseJsonFromFile");
const SearchPage = require("../pageobjects/search.page");
const SearchResultPage = require("../pageobjects/searchResult.page");

let testData = parseJsontestData(
  "scenarios/uiplayground/test/testData/test_data_search.json"
);

describe("Given: user wants to check test search functionality of CNN website", () => {
  beforeEach(async () => {
    await SearchPage.open();
  });

  context("When: user opens search page in browser", () => {
    testData.forEach(({ keyword, hasResult, noResultMsg }) => {
      it(`Then: search with key word [${keyword}] should return search result [${hasResult}]`, async () => {
        await SearchPage.searchKeyword(keyword);

        if (hasResult) {
          await SearchResultPage.assertSearchResultShown();
          await SearchResultPage.assertHeadlineHasKeyword();
          await SearchResultPage.assertResultCountHasKeyword(keyword);
        } else {
          await SearchResultPage.assertNoResultTitleText(noResultMsg);
          await SearchResultPage.assertNoResultSuggestsShown();
        }
      });

      it(`Then: clear button should clear text [${keyword}] in search bar`, async () => {
        await SearchPage.searchKeyword(keyword);
        await SearchResultPage.ClearSearch();
        await SearchResultPage.assertSearchInputCleared();
      });
    });
  });
});
