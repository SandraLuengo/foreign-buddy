const express = require('express');
const router  = express.Router();

router.use('/auth',require('./auth'));
router.use('/profile',require('./profile'));
router.use('/chat',require('./chat'));
router.use('/services',require('./services'));
router.use('/buddies',require('./buddies'));
module.exports = router;
