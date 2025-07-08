const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

// POST /api/guides/generate (generate conversation guide via n8n)
router.post('/generate', guideController.generateGuide);

// GET /api/guides (user's guides)
router.get('/', (req, res) => {
  res.status(501).json({ message: "Get all guides endpoint not implemented yet" });
});

// GET /api/guides/:id (specific guide)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: `Get guide ${id} endpoint not implemented yet` });
});

// DELETE /api/guides/:id (delete guide)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(501).json({ message: `Delete guide ${id} endpoint not implemented yet` });
});

module.exports = router;
