const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
    res.send('Register Page');
})

router.post('/login', (req, res) => {
    res.send('Login Page');
})

module.exports = router;