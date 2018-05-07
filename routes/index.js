var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ title: 'Welcome movies api' });
});

module.exports = router;
