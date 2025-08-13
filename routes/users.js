const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, isAdmin } = require('../middlewares/auth');

// Obtenir tous les membres (accessible uniquement par admin)
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const members = await User.find().select('-password');
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
