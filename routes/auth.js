const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Route POST /api/auth/register → inscription d’un nouvel utilisateur
router.post('/register', register);

// Route POST /api/auth/login → connexion utilisateur existant
router.post('/login', login);

module.exports = router;
