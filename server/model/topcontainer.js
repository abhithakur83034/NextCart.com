const mongoose = require('mongoose');
const topschema = require('../migration/topcontainer.json')
const TopSchema = new mongoose.Schema(topschema)

module.exports = mongoose.model("topcontainer",TopSchema)