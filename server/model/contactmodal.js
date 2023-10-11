const mongoose = require("mongoose");
const contactSchema = require("../migration/contact.json")
const ContactSchema = new mongoose.Schema(contactSchema)

module.exports = mongoose.model("contact",ContactSchema)