const express = require("express");
const app = express();
const { connectDatabase } = require("./database/database");

// importing from other folder

// connection to database
connectDatabase();
// mongoose
//   .connect(
//     "mongodb+srv://hello:hello@cluster0.oz2dydb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => {
//     console.log("database connected successfully!");
//   });

// GET api
app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Page sucessfully loaded!",
  });
});

app.listen(2000, () => {
  console.log("app started at the post 2000!");
});
