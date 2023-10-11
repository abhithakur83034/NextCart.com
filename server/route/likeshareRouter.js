const express = require('express');
const likeItem = require('../controller/likeShare'); 
const middleware = require('../middleware/middleware');
const router = express.Router();

router.post('/like', likeItem.likeApi);
router.get('/showlikeproduct',likeItem.showlikeProduct)


module.exports = router;
