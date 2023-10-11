const express = require('express');

const invoiceController = require('../controller/Invoicecontroller');
const middleware = require('../middleware/middleware');


const router = express.Router();

router.post('/user_invoice',invoiceController.invoice);
// router.get("/showfeedback", invoiceController.showfedback);


module.exports = router;