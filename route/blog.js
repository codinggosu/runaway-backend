const blogModel = require("../models/blogModel.js");
const { Model } = require("mongoose");

module.exports = function(app,mongoose){

    /**
     * @swagger
     * 
     * /api/volunteer/blog/post:
     *  post: 
     *      summary: Save blog post to database
     *      tags: [Blog]
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema:
     *                      $ref: "#/components/schemas/Blog"
     * 
     *      responses:
     *          "200":
     *              description: Blog post successfully saved to database
     */
    app.post("/api/volunteer/blog/post", function(req, res) {

        const title = req.body.title;
        const date = (new Date()).toJSON();
        console.log(req.body);
        blogModel.create({
            author: req.body.author,
            title: req.body.title,
            date: new Date(),
            content: req.body.content,
            readTime: req.body.readTime,
            imageURL: req.body.imageURL,
            url: `${date}/${title}`
        });    

    })
    
    /**
     * @swagger 
     * 
     * /api/volunteer/blog/get/{page}:
     *  get:
     *      summary: Get blog posts, limit to 20 posts at a time
     *      tags: [Blog]
     *      parameters: 
     *          - name: page
     *            in: path
     *            schema: 
     *              type: integer
     *            required: true
     *            description: The page number of blog posts to return
     *      responses:
     *          "200": 
     *              description: List of blogs
     *              content: 
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              $ref: "#/components/schemas/Blog"
     * 
     */
    app.get("/api/volunteer/blog/get/:page", function(req, res) {
        const resPerPage = 20;  // results per page
        const page = req.params.page || 1; // Page
        
        blogModel.find(null, null, { skip: (resPerPage * (page - 1)), limit: resPerPage }, function(err, blogs) {
            if (err) throw new Error(err);
            const count = blogs.length;

            // if there are no more blog posts, return no more found
            if (count == 0) {
                res.send("No more blog posts");
            } else {
                res.json(blogs);
            }
        });

    })

    /**
     * @swagger 
     * 
     * /api/volunteer/blog/get/url/{url}:
     *  get:
     *      summary: Get blog post by url
     *      tags: [Blog]
     *      parameters: 
     *          - name: url
     *            in: path
     *            schema: 
     *              type: string
     *            required: true
     *            description: The url of the blog post to return
     *      responses:
     *          "200": 
     *              description: Blog post matching the requested url
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: "#/components/schemas/Blog"
     * 
     */
    app.get("/api/volunteer/blog/get/url/:url", function(req, res) {
        const url = req.params.url;

        blogModel.findOne({ url: url }, function(err, blog) {
            if (err) throw new Error(err); 
            if (!blog) {
                res.send(`No blog post found from url: ${url}`);
            } else {
                res.json({success: "Found blog post", blog});
            }
        });
    });
}
