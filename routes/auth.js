const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { registerSchema, loginSchema } = require('../validators/user.schema');
const validate = require('../middlewares/validate');

// Route POST /api/auth/register → inscription d’un nouvel utilisateur
router.post('/register',validate(registerSchema), register);

// Route POST /api/auth/login → connexion utilisateur existant
router.post('/login', validate(loginSchema), login);

module.exports = router;
