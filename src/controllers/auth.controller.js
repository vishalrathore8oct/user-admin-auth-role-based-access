const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {

    res.send('Register Page Success');

}

const loginUser = async (req, res) => {

    res.send('Login Page Success');
    
}

module.exports = {
    registerUser,
    loginUser
}