const mongoose = require("mongoose");
const connectionString = "mongodb://127.0.0.1:27017/gamestats";

mongoose.connect(connectionString, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

connection.on("connected", function() {
  console.log("Connected to " + connectionString);
});

connection.on("error", function(error) {
  console.log("Connection to " + connectionString + " failed:" + error);
});

connection.on("disconnected", function() {
  console.log("Disconnected from " + connectionString);
});
