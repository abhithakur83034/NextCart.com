const mongoose = require('mongoose');
const stripeschema = require('../migration/stripe.json')
const StripeSchema = new mongoose.Schema(stripeschema)

module.exports = mongoose.model("sold",StripeSchema)