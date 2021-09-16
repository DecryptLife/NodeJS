// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

//importing the blog file
const Blog = require("../models/blogs");

const blog_index = (req, res) => {
  // sort() function is used to sort the result. It takes in an object which tells the details about the sort
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      // since blogs are used in EJS the key for the value result should be blogs
      res.render("blogs/index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  // to get the id of each blog
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog not found" });
    });
};

const blog_create_get = (req, res) => {
  res.render("blogs/create", { title: "Create a new Blog" });
};

const blog_create_post = (req, res) => {
  // req.body gives the data from the webform as objects which is then passed to the instance of Blog document
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  // when we use AJAX request we cannot do redirect but we have to give some json data back to browser which has the redirect property
  // which will be in the frontend
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
