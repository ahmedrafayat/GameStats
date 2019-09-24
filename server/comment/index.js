const Comment = require("./comment");

function create(req, res) {
  console.log(req.body);
  var comment = new Comment(req.body);
  comment.save(err => {
    console.log("Error in creating");
    res.redirect("/");
  });
}

function list(req, res) {
  Comment.find({}, (err, comments) => {
    if (err) {
      return res.status(400).send("Failed to fetch comments.");
    }
    res.status(200).send(comments);
  });
}

module.exports = {
  create,
  list
};
