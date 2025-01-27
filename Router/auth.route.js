const express = require("express");
const router = express.Router();
const userController = require("../Controller/auth/user.controller");
router.get("/login", async (req, res) => {
  // const products = await Product.find({});
  res.render("LogAndRegis");
});

router.post("/create-user", async (req, res) => {
  const result = await userController.createUser(req.body);
  if (result) {
    // res.render();
  }
});
module.exports = router;
