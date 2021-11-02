const chai = require("chai");
const should = require("chai").should();
const chaiHTTP = require("chai-http");
const Portfolio = require("../../model/Portfolio.model");
const User = require("../../model/User.model");
const Loan = require("../../model/Loan.model");
const server = require("../../server");

chai.use(chaiHTTP);

describe("User Portfolio - Controller Tests", () => {
  let token;
  before((done) => {
    //   Must first sign in user since all routes are protected
    chai
      .request(server)
      .post("/api/v1/user/signup")
      .send({
        name: "Edward Oboh",
        email: "osaretinedward@gmail.com",
        password: "12345",
        NIN: "0123465789",
        phone: "123456789",
        address: "address",
        sex: "male",
        age: 24,
        bank: "GTB",
        accountNumber: "0632734365",
        nationality: "Nigerian",
      })
      .end((err, resp) => {
        resp.should.have.status(201);
        // log in user to get user token for accessing protected routes
        chai
          .request(server)
          .post("/api/v1/user/login")
          .send({
            email: "osaretinedward@gmail.com",
            password: "12345",
          })
          .end((err, resp) => {
            resp.should.have.status(200);
            resp.should.be.json;
            resp.body.should.have.property("accessToken");
            token = resp.body.accessToken;
            done();
          });
      });
  });
  after((done) => {
    User.collection
      .drop()
      .then(() => {
        done();
      })
      .catch((err) => {
        console.error(err.message);
      });
  });

  it("Should throw an error when a user with no portfolio requests a loan", (done) => {
    chai
      .request(server)
      .post("/api/v1/loan/takeloan")
      .set("Authorization", token)
      .send({
        loanAmount: 1000,
        loanPeriod: 4,
        narration: "Asking for a loan",
        currency: "NGN",
      })
      .end((err, resp) => {
        resp.should.have.status(404);
        resp.body.should.have.property("err");
        done();
      });
  });

  describe("Receive Loan", () => {
    before((done) => {
      chai
        .request(server)
        .post("/api/v1/portfolio/create")
        .set("Authorization", token)
        .send({
          stockPositions: [
            {
              symbol: "AAPL",
              totalQuantity: 20,
              equityValue: 2500.0,
              pricePerShare: 125.0,
            },
            {
              symbol: "TSLA",
              totalQuantity: 5.0,
              equityValue: 3000.0,
              pricePerShare: 600.0,
            },
          ],
        })
        .end((err, resp) => {
          resp.should.have.status(201);
          resp.should.be.json;
          resp.should.be.a("object");
          resp.body.should.have.property("userId");
          resp.body.should.have.property("stockPositions");
          resp.body.stockPositions.should.have.lengthOf(2);
          resp.body.should.have.property("portfolioValue");
          resp.body.should.have.property("maxPercent");
          resp.body.should.have.property("loanMax");
          done();
        });
    });

    afterEach((done) => {
      Loan.deleteMany({})
        .then(() => {
          done();
        })
        .catch((err) => {
          console.error(err.message);
        });
    });

    after((done) => {
      Portfolio.collection
        .deleteMany({})
        .then(() => {
          done();
        })
        .catch((err) => {
          console.error(err.message);
        });
    });

    it("User should receive loan when within 60% of portfolio", (done) => {
      chai
        .request(server)
        .post("/api/v1/loan/takeloan")
        .set("Authorization", token)
        .send({
          loanAmount: 1000,
          loanPeriod: 4,
          narration: "Asking for a loan",
          currency: "NGN",
        })
        .end((err, resp) => {
          resp.should.have.status(200);
          resp.body.transferResponse.success.should.equal(true);
          resp.body.should.have.property("newLoan");
          done();
        });
    });

    it("User should be UNABLE to request loan above 60% of Portfolio", (done) => {
      // NB: Total Portfolio value is 5500 right now, we are going to request above 60%
      chai
        .request(server)
        .post("/api/v1/loan/takeloan")
        .set("Authorization", token)
        .send({
          loanAmount: 4000,
          loanPeriod: 4,
          narration: "Asking for a loan",
          currency: "NGN",
        })
        .end((err, resp) => {
          resp.should.have.status(406);
          resp.body.should.have.property("err");
          done();
        });
    });

    it("Should allow user successfully pay up balance owed", (done) => {
      chai
        .request(server)
        .post("/api/v1/loan/takeloan")
        .set("Authorization", token)
        .send({
          loanAmount: 1000,
          loanPeriod: 4,
          narration: "Asking for a loan",
          currency: "NGN",
        })
        .end((err, resp) => {
          resp.should.have.status(200);
          resp.body.transferResponse.success.should.equal(true);
          resp.body.should.have.property("newLoan");
          // Initiate payment of loan here
          chai
            .request(server)
            .post("/api/v1/loan/initiate/payback")
            .set("Authorization", token)
            .send({
              card_number: "5531886652142950",
              cvv: "564",
              expiry_month: "09",
              expiry_year: "23",
              currency: "NGN",
              amount: "3500",
              pin: 3310,
            })
            .end((err, resp) => {
              resp.should.have.status(200);
              const ref = resp.body.tx_ref;
              // Complete payment of loan here
              chai
                .request(server)
                .post("/api/v1/loan/complete/payback")
                .set("Authorization", token)
                .send({
                  otp: 12345,
                  tx_ref: ref,
                })
                .end((err, resp) => {
                  resp.should.have.status(200);
                  done();
                });
            });
        });
    });
  });
});
