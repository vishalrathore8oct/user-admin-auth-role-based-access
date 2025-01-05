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

const createTaskByUser = async (req, res) => {
    try {
        const { title, description } = req.body;
        console.log(req.user);
        

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        await Task.create({ title, description, user: req.user._id });

        res.status(201).json({ message: 'Task created successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });

    }

}


module.exports = {
    getAllTasksByUser,
    getAllTasksByAdmin,
    createTaskByUser
}