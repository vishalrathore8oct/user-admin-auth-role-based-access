const express = require('express');
const router = express.Router();
const { getAllTasksByUser, getAllTasksByAdmin } = require('../controllers/task.controller.js');
const verifyToken = require('../middlewares/auth.middleware.js');
const roleMiddleware = require('../middlewares/role.middleware.js');

router.get('/user', verifyToken, roleMiddleware('user'), getAllTasksByUser);
router.get('/admin', verifyToken, roleMiddleware('admin'), getAllTasksByAdmin);


module.exports = router;