const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middlewares/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');


router.get('/', protect, getTasks);
router.post('/', protect, createTask);
router.put('/:id', protect, isAdmin, updateTask);
router.delete('/:id', protect, isAdmin, deleteTask);

module.exports = router;
