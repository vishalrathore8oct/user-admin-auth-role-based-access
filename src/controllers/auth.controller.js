const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // console.log(name, email, password);

        if (!name || !email || !password) {
            return res.status(400).send('Please fill all the fields');
        }

        const userExist = await User.findOne({ email });

        // console.log(userExist);

        if (userExist) {
            return res.status(400).send('User already exist');
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        res.status(201).json({ message: 'User registered successfully', id: user._id, name: user.name, email: user.email, role: user.role });

    } catch (error) {

        res.status(500).json({ message: 'Error registering user', error });

    }



}

const loginUser = async (req, res) => {

    res.send('Login Page Success');

}

module.exports = {
    registerUser,
    loginUser
}