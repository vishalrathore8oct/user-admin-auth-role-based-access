const Task = require('../models/task.model.js');

const getAllTasksByUser = async (req, res) => {
    try {

        const tasks = await Task.find({ user: req.user._id });

        res.status(200).json({ message: 'All Tasks By User fetched successfully', tasks });
        
    } catch (error) {

        res.status(500).json({ message: 'Error fetching user tasks', error });
        
    }
}

const getAllTasksByAdmin = async (req, res) => {
    try {
        const tasks = await Task.find();

        res.status(200).json({ message: 'All tasks By Admin fetched successfully', tasks });
        
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all tasks', error });
        
    }
}

module.exports = {
    getAllTasksByUser,
    getAllTasksByAdmin
}