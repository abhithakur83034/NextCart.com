const mongoose = require('mongoose');
const invoiceschema = require('../migration/invoice.json')
const InvoiceSchema = new mongoose.Schema(invoiceschema)

module.exports = mongoose.model("invoice",InvoiceSchema)