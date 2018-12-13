const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.use('/auth',require('./auth'));
router.use('/profile',require('./profile'));
router.use('/chat',require('./chat'));
router.use('/services',require('./services'));
router.use('/posts',require('./posts'));
router.use('/buddies',require('./buddies'));
module.exports = router;
