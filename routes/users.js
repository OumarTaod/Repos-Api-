const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middlewares/auth');
const { getAllUsers, deleteUser } = require('../controllers/userController');

// 🔐 Admin seulement : voir tous les utilisateurs
router.get('/', /*protect,*/ isAdmin, getAllUsers);

// 🔐 Admin seulement : supprimer un utilisateur par ID
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
