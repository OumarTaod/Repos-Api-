const express = require('express');
const router = express.Router();
const { taskSchema } = require('../validators/task.schema');
const validate = require('../middlewares/validate');

const { protect, isAdmin } = require('../middlewares/auth');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasksController');


router.get('/', protect, getTasks);
router.post('/', protect, validate(taskSchema), createTask);
router.put('/:id', protect, isAdmin,validate(taskSchema), updateTask);
router.delete('/:id', protect, isAdmin, deleteTask);

module.exports = router;
