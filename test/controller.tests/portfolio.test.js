const chai = require("chai");
const should = require("chai").should();
const chaiHTTP = require("chai-http");
const Portfolio = require("../../model/Portfolio.model");
const User = require("../../model/User.model");
const server = require("../../server");

chai.use(chaiHTTP);

describe("User Portfolio - Controller Tests", () => {
  let token;
  before((done) => {
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
    Portfolio.collection
      .drop()
      .then(() => {
        return User.collection.drop();
      })
      .then(() => {
        done();
      })
      .catch((err) => {
        console.error(err.message);
      });
  });

  it("Create Portfolio - Should successfully create a user portfolio", (done) => {
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

  it("Get User Portfolio - Should pull a user portfolio, showing all positions", (done) => {
    chai
      .request(server)
      .get("/api/v1/portfolio")
      .set("Authorization", token)
      .end((err, resp) => {
        resp.should.have.status(200);
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

  it("Get Portfolio Value - Should get the total value of a user's portfolio", (done) => {
    chai
      .request(server)
      .get("/api/v1/portfolio/value")
      .set("Authorization", token)
      .end((err, resp) => {
        resp.should.have.status(200);
        resp.should.be.json;
        resp.body.should.equal(5500);
        done();
      });
  });
});
