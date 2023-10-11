const mongoose = require('mongoose');
const likeshareschema = require('../migration/like&share.json')
const LikeShareSchema = new mongoose.Schema(likeshareschema)

module.exports = mongoose.model("like&share",LikeShareSchema)