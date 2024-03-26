const express = require("express");
const app = express();

// importing from other folder
const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");

app.set("view engine", "ejs");

// to parse json data from forms
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection function to database
connectDatabase();

// GET api
app.get("/", (req, res) => {
  res.render("home");
});

// CREATE Blog apis
app.post("/blogs", async (req, res) => {
  const { title, subTitle, description } = req.body;

  // insert to database goes here
  await Blog.create({
    title: title,
    subTitle: subTitle,
    description: description,
  });

  res.json({
    status: 201,
    message: "blog created",
  });

  // Alternative
  // res.status(200).json({
  //   message: "blog created",
  // });
});

// GET Api for all blogs
app.get("/blogs", async (req, res) => {
  // fetching all blogs from the database
  const blogs = await Blog.find();
  if (blogs.length == 0) {
    res.status(404).json({
      // status: 404,
      message: "There is no blog!",
    });
  } else {
    res.json({
      status: 200,
      message: "Blogs fetched succesfully!",
      data: blogs,
    });
  }
});

// GET Api for single blog
app.get("/blogs/:id", async (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  const blog = await Blog.findById(id);
  // alternative
  // const blog = await Blog.find({_id : id})

  if (blog) {
    res.status(200).json({
      status: 200,
      message: "single blog fetched",
      data: blog,
    });
  } else {
    res.status(404).json({
      message: "Blog is not available right now!",
    });
  }
});

// API for edit and update blogs
app.patch("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, subTitle, description } = req.body;
  console.log(req.body);

  await Blog.findByIdAndUpdate(id, {
    title: title,
    subTitle: subTitle,
    description: description,
  });
  res.status(200).json({
    message: "Blog edited succesfully",
  });
});

// API for deleting app
app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  await Blog.findByIdAndDelete(id);
  res.status(200).json({
    message: "blog deleted succesfully",
  });
});

// establishing connection to the port 2000
app.listen(2000, () => {
  console.log("app started at the post 2000!");
});
