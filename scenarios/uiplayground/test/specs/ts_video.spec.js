const VideoPage = require("../pageobjects/video.page");

describe("Given: user wants to check video functionality of CNN website", () => {
  beforeEach(async () => {
    await VideoPage.open();
  });

  context("When: user opens video page in browser", async () => {
    it("Then: user can play video by hitting play button", async () => {
      await VideoPage.playVideo();
      await VideoPage.waitVideoToPlay();
      await VideoPage.assertVideoPlay();
    });

    it("Then: total number of suggested videos should be displayed correctly", async () => {
      await VideoPage.assertSuggestVideoCount();
    });

    it("Then: user can play video from suggested list", async () => {
      const videoIndex = 1;
      await VideoPage.waitVideoToLoad();
      await VideoPage.playSuggestedVideo(videoIndex);
      await VideoPage.waitVideoToPlay();
      await VideoPage.assertSuggestVideoPlaying();
    });
  });
});
