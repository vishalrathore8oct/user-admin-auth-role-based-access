const express = require('express');
const router = express.Router();
const { getAllTasksByUser, getAllTasksByAdmin, createTaskByUser } = require('../controllers/task.controller.js');
const verifyToken = require('../middlewares/auth.middleware.js');
const roleMiddleware = require('../middlewares/role.middleware.js');
const { create } = require('../models/task.model.js');

router.get('/user', verifyToken, roleMiddleware(['user', 'admin']), getAllTasksByUser);
router.get('/admin', verifyToken, roleMiddleware(['admin']), getAllTasksByAdmin);

router.post('/create', verifyToken, roleMiddleware(['user', 'admin']), createTaskByUser);


module.exports = router;