const express = require("express");
const app = express();

// importing from other folder
const { connectDatabase } = require("./database/database");
const Blog = require("./model/blogModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection to database
connectDatabase();

// GET api
app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Page sucessfully loaded!",
  });
});

// CREATE Blog api
app.post("/createBlog", async (req, res) => {
  console.log(req.body);

  // insert to database goes here
  await Blog.create({
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
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

app.listen(2000, () => {
  console.log("app started at the post 2000!");
});
