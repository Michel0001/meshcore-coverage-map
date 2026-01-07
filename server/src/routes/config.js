const express = require('express');
const router = express.Router();
const { getCenterPos, getMaxDistanceMiles, getInitialZoom, initialZoom } = require('../utils/shared');

// GET /config - Get frontend configuration
router.get('/config', (req, res) => {
  const centerPos = getCenterPos();
  const maxDistanceMiles = getMaxDistanceMiles();
  const intialZoom = getInitialZoom();
  
  res.json({
    centerPos: centerPos,
    maxDistanceMiles: maxDistanceMiles,
    intialZoom: initialZoom
  });
});

module.exports = router;

