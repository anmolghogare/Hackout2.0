const express = require('express');
const router = express.Router();
const {
  getBaseline,
  calculateSimulation,
  getCopilotResponse,
  getCircularMatches,
  getRoadmap
} = require('../controllers/mainController');

router.get('/facility/baseline', getBaseline);
router.post('/simulation/calculate', calculateSimulation);
router.post('/copilot/query', getCopilotResponse);
router.get('/circular/matches', getCircularMatches);
router.get('/roadmap', getRoadmap);

module.exports = router;
