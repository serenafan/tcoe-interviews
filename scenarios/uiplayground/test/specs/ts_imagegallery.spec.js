const ImageGalleryPage = require("../pageobjects/imageGallery.page");
const {
  parseJsontestData,
} = require("../../../../utilities/parseJsonFromFile");

let testData = parseJsontestData(
  "scenarios/uiplayground/test/testData/test_data_image_gallery.json"
);

describe("Given: user wants to check test image gallery functionality of CNN website", () => {
  beforeEach(async () => {
    await ImageGalleryPage.open();
  });

  context("When: user opens image gallery page in browser", () => {
    it("then current image indicator should update after user click on next image slide", async () => {
      await ImageGalleryPage.assertImgUpdateOnNext();
    });

    it("then current image indicator should update after user click on previous image slide", async () => {
      await ImageGalleryPage.assertImgUpdateOnPrevious();
    });

    it("then total number of images should be displayed correctly", async () => {
      await ImageGalleryPage.assertImgCount();
    });

    testData.forEach(
      async ({ location, country, description, photographer }) => {
        it("then image caption and credit should be displayed correctly", async () => {
          const expectedCaption = `${location}, ${country}: ${description}`;
          await ImageGalleryPage.assertCaptionText(expectedCaption);
          await ImageGalleryPage.assertCreditText(photographer);
        });
      }
    );
  });
});
