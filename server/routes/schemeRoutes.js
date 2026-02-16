const express = require('express');
const router = express.Router();
const { getSchemes, addScheme, updateScheme, deleteScheme } = require('../controllers/schemeController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSchemes);

// Admin routes (future scaling)
router.post('/', protect, addScheme);
router.put('/:id', protect, updateScheme);
router.delete('/:id', protect, deleteScheme);

module.exports = router;
