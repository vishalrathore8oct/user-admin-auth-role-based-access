const User = require('../models/user.model.js');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;
        // console.log(name, email, password);

        if (!name || !email || !password) {
            return res.status(400).josn({ message: 'Please fill all the fields' });
        }

        const userExist = await User.findOne({ email });
        // console.log(userExist);

        if (userExist) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({ success: true ,message: 'User registered successfully', id: user._id, name: user.name, email: user.email, role: user.role });

        // res.redirect('/');

    } catch (error) {

        res.status(500).json({ message: 'Error registering user', error });

    }



}

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all the fields' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User With this email does not exist' });
        }

        const passwordMatch = await user.comparePassword(password);

        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        res.status(200).json({ success: true, message: 'User logged in successfully', token: token});
        
        // res.cookie('token', token, { httpOnly: true });
        // res.redirect('/');

    } catch (error) {

        res.status(500).json({ message: 'Error logging in user', error });

    }

}

module.exports = {
    registerUser,
    loginUser
}