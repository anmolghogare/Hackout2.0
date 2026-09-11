const express = require('express');
const router = express.Router();
const { getStatus, handleData } = require('../controllers/mainController');

router.get('/status', getStatus);
router.post('/data', handleData);

module.exports = router;
