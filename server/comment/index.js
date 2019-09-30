const Comment = require("./comment");

function create(req, res) {
  var comment = new Comment(req.body);
  comment.save(err => {
    if (err) {
      console.log("Error in creating ", err);
    }
    res.status(200).send(comment);
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

function remove(req, res) {
  Comment.findByIdAndDelete(req.params.id, (err, val) => {
    res.status(200).send("Okay!");
  });
}

function getByName(req, res) {
  Comment.find({ commentTo: req.params.gamertag }, (err, comments) => {
    if (!err) {
      res.status(200).send(comments);
    } else {
      res.send(error);
    }
  });
}

module.exports = {
  create,
  list,
  remove,
  getByName
};
