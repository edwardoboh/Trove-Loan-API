const server = require("../../server");
const User = require("../../model/User.model");
const chai = require("chai");
const chaiHTTP = require("chai-http");
const should = chai.should();
chai.use(chaiHTTP);

describe("/GET All Users - Controller Tests", () => {
  before(function (done) {
    const newUser = new User({
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
    });
    newUser.save((err) => {
      done();
    });
  });

  after((done) => {
    User.collection
      .drop()
      .then(() => {
        done();
      })
      .catch((err) => {
        console.warn("Collection may no longer exist");
      });
  });
  it("Should get all users in the Database", (done) => {
    chai
      .request(server)
      .get("/api/v1/user/all")
      .end((err, resp) => {
        resp.should.have.status(200);
        resp.should.be.json;
        resp.body.should.be.a("array");
        resp.body[0].should.have.property("_id");
        resp.body[0].should.have.property("name");
        resp.body[0].should.have.property("email");
        resp.body[0].should.have.property("password");
        resp.body[0].should.have.property("phone");
        resp.body[0].should.have.property("address");
        resp.body[0].should.have.property("NIN");
        resp.body[0].should.have.property("sex");
        resp.body[0].should.have.property("age");
        resp.body[0].should.have.property("bank");
        resp.body[0].should.have.property("accountNumber");
        resp.body[0].should.have.property("nationality");
        done();
      });
  });
});

describe("User Workflow - Controller Tests", () => {
  let token;
  after((done) => {
    User.collection
      .drop()
      .then(() => {})
      .catch((err) => {
        console.warn("Collection may not exist");
      });
    done();
  });

  it("Signup - Should Create a user by calling the signup endpoint", (done) => {
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
        resp.should.be.a("object");
        resp.body.should.have.property("_id");
        resp.body.should.have.property("email");
        resp.body.should.have.property("name");
        resp.body.should.have.property("password");
        resp.body.should.have.property("sex");
        resp.body.should.have.property("phone");
        resp.body.should.have.property("address");
        resp.body.should.have.property("NIN");
        resp.body.should.have.property("age");
        resp.body.should.have.property("bank");
        resp.body.should.have.property("accountNumber");
        resp.body.should.have.property("nationality");
        done();
      });
  });
  it("Login - should login the user after a successful signup", (done) => {
    chai
      .request(server)
      .post("/api/v1/user/login")
      .send({
        email: "osaretinedward@gmail.com",
        password: "12345",
      })
      .end((err, resp) => {
        token = resp.body.accessToken;
        resp.should.have.status(200);
        resp.should.be.a("object");
        resp.body.user.should.have.property("name");
        resp.body.user.should.have.property("email");
        resp.body.user.should.not.have.property("password");
        resp.body.should.have.property("accessToken");
        done();
      });
  });
  it("Get User - Should get all details of a user", (done) => {
    chai
      .request(server)
      .get("/api/v1/user")
      .set("Authorization", token)
      .end((err, resp) => {
        resp.should.have.status(200);
        resp.should.be.a("object");
        resp.body.should.have.property("phone");
        resp.body.should.have.property("address");
        resp.body.should.have.property("NIN");
        resp.body.should.have.property("age");
        resp.body.should.have.property("bank");
        done();
      });
  });
  it("Update User - Should update the details of a user", (done) => {
    chai
      .request(server)
      .put("/api/v1/user/update")
      .set("Authorization", token)
      .send({
        name: "Paul O Peter",
        phone: "9876543210",
        address: "new address",
      })
      .end((err, resp) => {
        resp.should.have.status(201);
        resp.should.be.a("object");
        resp.body.name.should.equal("Paul O Peter");
        resp.body.address.should.equal("new address");
        resp.body.phone.should.equal("9876543210");
        resp.body.should.have.property("email");
        resp.body.should.have.property("address");
        done();
      });
  });
  it("Delete User - Should the delete the user's account", (done) => {
    chai
      .request(server)
      .delete("/api/v1/user/delete")
      .set("Authorization", token)
      .end((err, resp) => {
        resp.should.have.status(200);
        resp.body.success.should.equal(true);
        chai
          .request(server)
          .get("/api/v1/user")
          .set("Authorization", token)
          .end((err, resp) => {
            resp.should.have.status(404);
            done();
          });
      });
  });
});
