const express = require("express");
const contactController = require("../controller/contactcontroller")
const router = express.Router();

router.post("/contact",contactController.contact)

module.exports = router;