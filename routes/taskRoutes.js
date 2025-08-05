const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.post('/tasks/:id/toggle', taskController.toggleCompleted);
router.put('/tasks/:id', taskController.editTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;