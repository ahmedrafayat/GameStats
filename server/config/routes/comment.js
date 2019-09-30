const express = require("express");
const router = express.Router();
Comment = require("../../comment");

router.route("/api/v1/comments/all").get(Comment.list);

router.post("/api/v1/comments", Comment.create);

router.delete("/api/v1/comments/:id", Comment.remove);
router.get("/api/v1/comments/:gamertag", Comment.getByName);

module.exports = router;
