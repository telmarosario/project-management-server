const express = require("express");
const router = express.Router();
const Task = require('./../models/task.model');
const Project = require('./../models/project.model');
const mongoose = require('mongoose');


router.post('/api/tasks', async(req, res, next) => {
    try {
        const { title, description, projectId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            res.status(400).json({ message: "Invalid object id" });
            return;
          }      

        const createdTask = await Task.create({ title, description, project: projectId });
        await Project.findByIdAndUpdate(projectId, { $push: { tasks: createdTask._id }});
        res.status(201).json(createdTask);

    } catch (error) {
         res.status(500).json(error);
    }

});



module.exports = router;