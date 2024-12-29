const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).send('Access denied. No token provided');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
        
    } catch (error) {
        res.status(401).send('Access denied. Invalid token');
        
    }
}

module.exports = verifyToken;