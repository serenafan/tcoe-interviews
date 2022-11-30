const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../api/app");
const expect = require("chai").expect;
const {
  getCurrentDate,
  getTomorrowDate,
  getYesterdayDate,
} = require("./utility/dateUtility");

const validDate = {
  currentDate: getCurrentDate(),
  yesterdayDate: getYesterdayDate(),
};
const invalidDate = {
  withZeroInDate: "05-January-2000",
  withInvalidLetter: "ssddwwss",
  tomorrowDate: getTomorrowDate(),
};

chai.use(chaiHttp);

describe("stocks api", function () {
  describe("GET /trades", function () {
    context("validate request behavior", function () {
      it(
        "TC1 - request behaviour - positive - should return 200 when querying date in current date with format d-mmmm-yyyy: " +
          validDate.currentDate,
        async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${validDate.currentDate}`)
            .then(function (res) {
              expect(res).to.have.status(200);
            });
        }
      );

      it(
        "TC2 - request behaviour - positive - should return 200 when querying date in past date with format d-mmmm-yyyy: " +
          validDate.yesterdayDate,
        async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${validDate.yesterdayDate}`)
            .then(function (res) {
              expect(res).to.have.status(200);
            });
        }
      );

      it("TC2 - request behaviour - negative - should return 404 when query parameter is not given", async function () {
        return chai
          .request(app)
          .post(`/api/stocks`)
          .then(function (res) {
            expect(res).to.have.status(404);
          });
      });

      it("TC3 - request behaviour - negative - should return 404 when method is incorrect with 'Post'", async function () {
        return chai
          .request(app)
          .post(`/api/stocks/?date=${validDate.currentDate}`)
          .then(function (res) {
            expect(res).to.have.status(404);
          });
      });

      it("TC4 - request behaviour - negative - should return 404 when resource endpoint /api/stock is incorrect", async function () {
        return chai
          .request(app)
          .get(`/api/stock/?date=${validDate.currentDate}`)
          .then(function (res) {
            expect(res).to.have.status(404);
          });
      });

      // bug scenario, should return 400 with leading zero. Instead, it returns 200
      it(
        "TC5 - request behaviour - negative - should return 400 when querying date in format dd-mmmm-yyyy: " +
          invalidDate.withZeroInDate,
        async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${invalidDate.withZeroInDate}`)
            .then(function (res) {
              expect(res).to.have.status(400);
            });
        }
      );

      // bug scenario, should return 400 with future date. Instead, it returns 200
      it(
        "TC6 - request behaviour - negative - should return 400 when querying date with future date " +
          invalidDate.tomorrowDate,
        async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${invalidDate.tomorrowDate}`)
            .then(function (res) {
              expect(res).to.have.status(400);
            });
        }
      );

      // bug scenario, should return 400 with invalid letter in date. Instead, it returns 200
      it(
        "TC7 - request behaviour - negative - should return 400 when querying with invalid letters: " +
        invalidDate.withInvalidLetter,
        async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${invalidDate.withInvalidLetter}`)
            .then(function (res) {
              expect(res).to.have.status(400);
            });
        }
      );

      context("validate response behaviour", function () {
        it("TC1 - response behaviour - positive - should have date, open, high, low, and close in response body", async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${validDate.currentDate}`)
            .then(function (res) {
              expect(res.body).to.have.property("date");
              expect(res.body).to.have.property("open");
              expect(res.body).to.have.property("high");
              expect(res.body).to.have.property("low");
              expect(res.body).to.have.property("close");
            });
        });

        it("TC2 - response behaviour - positive - response date value should = request parameter date", async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${validDate.currentDate}`)
            .then(function (res) {
              expect(res.body.date).to.equal(validDate.currentDate)
            });
        });

        // bug scenario, sometimes close value and open value are less than low value
        it("TC3 - response behaviour - positive - response close/open value should >= response low value ", async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${validDate.currentDate}`)
            .then(function (res) {
              expect(parseFloat(res.body.close)).to.be.at.least(parseFloat(res.body.low))
              expect(parseFloat(res.body.open)).to.be.at.least(parseFloat(res.body.low))
            });
        });

        // bug scenario, sometimes close value and open value are larger than high value
        it("TC4 - response behaviour - positive - response close/open value should <= response high value ", async function () {
          return chai
            .request(app)
            .get(`/api/stocks/?date=${validDate.currentDate}`)
            .then(function (res) {
              console.log(res.body)
              expect(parseFloat(res.body.close)).to.be.at.most(parseFloat(res.body.high))
              expect(parseFloat(res.body.open)).to.be.at.most(parseFloat(res.body.high))
            });
        });
      });
    });
  });
});
