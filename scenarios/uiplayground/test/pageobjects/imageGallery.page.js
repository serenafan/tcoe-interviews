const Page = require("./page");
const expectchai = require("chai").expect;

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ImageGalleryPage extends Page {
  /**
   * define selectors using getter methods
   */
  get imageSlides() {
    return $$("li.slider-slide");
  }

  get imageCountIcon() {
    return $(".GalleryHeroDecorators__count");
  }

  get nextBtn() {
    return $(".GalleryHeroDecorators__next");
  }

  get previousBtn() {
    return $(".GalleryHeroDecorators__previous");
  }

  get imgCaption() {
    return $(".GalleryHero__caption");
  }

  get imgCredit() {
    return $(".GalleryHero__credit");
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open("travel/gallery/top-christmas-markets/index.html");
  }

  /**
   * This method gets the current image number from indicator on the page
   * @returns current image number from indicator
   */
  async getCurrentImageIndicator() {
    const countIndicator = await super.getElementText(this.imageCountIcon);
    const currentImg = countIndicator.split("/")[0];
    return parseInt(currentImg);
  }

  /**
   * This method gets total number of images by counting how many slides there are
   * @returns total image number from slides
   */
  async getSlideIndexArray() {
    const totalImgSlides = await super.getElementCount(this.imageSlides);
    const slideIndexArray = [...new Array(totalImgSlides).keys()].map(
      (el) => el + 1
    );
    return slideIndexArray;
  }

  /**
   * This method gets total number of images from indicator on the page
   * @returns total image number from indicator
   */
  async getTotalImageFromIndicator() {
    const countIndicator = await super.getElementText(this.imageCountIcon);
    const totalImage = countIndicator.split("/")[1];
    return parseInt(totalImage);
  }

  /**
   * This method clicks next button
   */
  async slideToNextImage() {
    await super.clickElement(this.nextBtn);
  }

  /**
   * This method clicks previous button
   */
  async slideToPrevImage() {
    await super.clickElement(this.previousBtn);
  }

  /**
   * This method assert current image updates when click on next button
   */
  async assertImgUpdateOnNext() {
    const slideIndexArray = await this.getSlideIndexArray();
    for (const index of slideIndexArray) {
      const currentImageIndicator = await this.getCurrentImageIndicator();
      expectchai(currentImageIndicator).to.be.equals(index);
      await this.slideToNextImage();
    }
  }

  /**
   * This method assert current image updates when click on previous button
   */
  async assertImgUpdateOnPrevious() {
    const slideIndexArrayReversed = (await this.getSlideIndexArray()).reverse();
    for (const index of slideIndexArrayReversed) {
      await this.slideToPrevImage();
      const currentImageIndicator = await this.getCurrentImageIndicator();
      expectchai(currentImageIndicator).to.be.equals(index);
    }
  }

  /**
   * This method assert total image indicator display should match with actual slides number
   */
  async assertImgCount() {
    const totalImgSlides = (await this.getSlideIndexArray()).length;
    const totalImgFromIndicator = await this.getTotalImageFromIndicator();
    expectchai(totalImgSlides).to.be.equals(totalImgFromIndicator);
  }

  /**
   * This method assert caption text should match with expected caption
   */
  async assertCaptionText(expectedCaption) {
    const imageCaption = await super.getElementText(this.imgCaption);
    expectchai(imageCaption).to.be.equals(expectedCaption);
  }

  /**
   * This method assert credit text should match with expected credit
   */
  async assertCreditText(expectedCredit) {
    const imageCredit = await super.getElementText(this.imgCredit);
    expectchai(imageCredit).to.be.equals(expectedCredit);
  }
}

module.exports = new ImageGalleryPage();
