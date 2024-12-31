const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;

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
            password
        });

        // res.status(201).json({ message: 'User registered successfully', id: user._id, name: user.name, email: user.email, role: user.role });

        // res.redirect('index', { message: 'User registered successfully', id: user._id, name: user.name, email: user.email, role: user.role });

        res.redirect('/');

    } catch (error) {

        res.status(500).json({ message: 'Error registering user', error });

    }



}

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Please fill all the fields');
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Email does not exist');
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(400).send('Password does not match');
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // res.status(200).json({ message: 'User logged in successfully', token });

        // res.render('index', { message: 'User logged in successfully', token });

        res.status(200).cookie('token', token, { httpOnly: true });
        res.redirect('/');

    } catch (error) {

        res.status(500).json({ message: 'Error logging in user', error });

    }

}

module.exports = {
    registerUser,
    loginUser
}