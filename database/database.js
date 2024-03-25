const { default: mongoose } = require("mongoose");

exports.connectDatabase = async () => {
  // connection to database
  await mongoose.connect(
    "mongodb+srv://hello:hello@cluster0.oz2dydb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("database connected succesfully!");
};
