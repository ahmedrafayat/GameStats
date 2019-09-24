const express = require("express");
const router = express.Router();
Comment = require("../../comment");

router.route("/api/v1/comments/all").get(Comment.list);

router.post("/api/v1/comments", Comment.create);

module.exports = router;
