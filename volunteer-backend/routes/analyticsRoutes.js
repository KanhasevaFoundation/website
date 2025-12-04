const express = require('express');
const router = express.Router();
const { recordEvent, getSummary, listEvents } = require('../controllers/analyticsController');

router.post('/event', recordEvent);
router.get('/summary', getSummary);
router.get('/events', listEvents);

module.exports = router;
