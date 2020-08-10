const server = require("./server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

chai.use(chaiHttp);

describe("/GET Hello World", () => {
  it("should return Hello World", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("/GET Blog Posts 20 at a time", () => {
  it("should return array of blog posts", (done) => {
    chai
      .request(server)
      .get("/api/volunteer/blog/get/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("blogs");
        done();
      });
  });
});
