const server = require("./server");
const chai = require("chai");
const chaiHttp = require("chai-http")
const should = chai.should();

chai.use(chaiHttp);

describe("/GET Hello World", () => {
    it("should return Hello World", (done)=>{
        chai.request(server)
            .get('/')
            .end((err,res)=>{
                res.should.have.status(200);
                done();
            })
    })
})

describe("/GET Blog Posts 20 at a time", () => {
    it("should return array of blog posts", (done) => {
        chai.request(server)
            .get("/api/volunteer/blog/get/1")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});

describe("/GET Blog Post by Url", () => {
    it("should return one blog post by the given url", (done) => {
        const url = "2020-06-26T23:13:29.232Z/Whatever Title";
        chai.request(server)
            .get(`/api/volunteer/blog/get/url/${encodeURIComponent(url)}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("blog");
                res.body.blog.should.have.property("url").eql(url);
                done();
            });
    });
});

describe("/POST Event Details", () => {
    it("should successfully save event to database", (done) => {
        const event = {
            organizer: "Cedric", 
            title: "Dope Event",
            content: "Will be a really dope event",
            location: {
                type: "Point",
                coordinates: [-122.8, 47.0]
            }
        };

        chai.request(server)   
            .post("/api/volunteer/event")
            .send(event)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("success");
                res.body.should.have.property("eventDetails");
                done();
            });
    });
});