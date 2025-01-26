const express = require("express");
const router = express.Router();

router.get("/login", async (req, res) => {
  // const products = await Product.find({});
  res.render("LogAndRegis");
});

router.post("/create-user", async (req, res) => {
  console.log("ádad", req.body);
});
module.exports = router;
