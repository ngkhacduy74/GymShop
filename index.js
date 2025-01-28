const express = require("express");
require("dotenv").config();
const app = express();
const path = require("path");
const route = require("./Router/index");
const configs = require("./Config/index");
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const { cloudinary, configCloudinary } = require("./Config/index");
// configCloudinary();

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "image_gymshop",
//   allowedFormats: ["jpg", "png", "jpeg"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }],
// });
// const upload = multer({
//   storage: storage,
// });
// app.post(
//   "/upload",
//   upload.fields([{ name: "img", maxCount: 1 }]),
//   (req, res) => {
//     const link_img = req.files["img"][0];
//     res.send(link_img);
//   }
// );
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
