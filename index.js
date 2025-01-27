const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const route = require("./Router/index");
const configs = require("./Config/index");

app.set("views", path.join(__dirname, "Views"));
app.set("view engine", "ejs");
app.use(express.json());
configs.connect();
app.use(express.static("Views"));
route(app);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
