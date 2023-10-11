const express = require('express')
const multer = require("multer")
const topContainers = require("../controller/topContainerController")

const router = express.Router();
// router.use('/img', express.static("./uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" 
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, 
  },
  fileFilter: fileFilter,
});
router.post("/containerupload", upload.single("image"),topContainers.topContainer);
router.get("/showcontainer",topContainers.showContainer);

module.exports = router;