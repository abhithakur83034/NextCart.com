const mongoose = require("mongoose")
const addtocartschema = require('../migration/addtocart.json')
const AddToCartSchema = new mongoose.Schema(addtocartschema)

module.exports = mongoose.model("cart",AddToCartSchema)
