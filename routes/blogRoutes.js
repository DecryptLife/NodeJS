const express = require("express");

const blogController = require("../controllers/blogController");

// new instance of Router object
// we'll be attaching the routes to the router ie remove app and replace it with router
const router = express.Router();

// blog routes
router.get("/", blogController.blog_index);

// when we click the submit button we have to send the data ie POST
router.post("/", blogController.blog_create_post);

//  this should fire first and not the  next one because it will find something with id create
// create blog
router.get("/create", blogController.blog_create_get);

// route parameter
router.get("/:id", blogController.blog_details);

// delete route
router.delete("/:id", blogController.blog_delete);

//exporting the router and import it in app.js
module.exports = router;
