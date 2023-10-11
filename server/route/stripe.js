const express = require("express");
const multer = require('multer')
const stripecontroller= require('../controller/stripecontroller')
const middleware = require("../middleware/middleware");
const router = express.Router();



router.post("/create-checkout-session", middleware.verifyToken,stripecontroller.checkout);
router.get("/retrive-checkout-session",middleware.verifyToken,stripecontroller.invoice)
router.get("/transaction",stripecontroller.transaction);
router.get("/sold",stripecontroller.soldproduct)
  
  
module.exports = router;