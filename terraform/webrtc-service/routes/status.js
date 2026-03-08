var express = require('express');
var router = express.Router();

/* GET message. */
router.get('/', function(req, res, next) {
  res.json({ message: 'WebRTC Signaling Service', status: 'running' });
});

module.exports = router;
