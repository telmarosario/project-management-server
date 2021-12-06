const express = require("express");
const router = express.Router();
const Project = require('./../models/project.model');
const mongoose = require('mongoose');

// POST  /api/projects Adds a new project
router.post('/api/projects', async(req, res, next) => {
    try {
    
    // Get the data from the request body
    const { title, description } = req.body; 

    // Save the data in the db
    const createdProject = await Project.create({title, description});

    res.status(201).json(createdProject);    
        
    } catch (error) {
        res.status(500).json(error);
    }
})

// GET 	/api/projects Returns all the projects
router.get('/api/projects', async(req, res, next) => {
    try {
        
        const allProjects = await Project.find(); 

        res.status(200).json(allProjects);

    } catch (error) {
        res.status(500).json(error);
    }

})

// GET /api/projects/:projectId Returns the specified project
router.get('/api/projects/:projectId', async(req, res, next) => {
    try {
        const { projectId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            res.status(400).json({ message: "Invalid object id" });
            return;
          }      
    
        const foundProject = await Project.findById(projectId);

        res.status(200).json(foundProject);
        
    } catch (error) {
        res.status(500).json(error);
    }


});

// PUT /api/projects/:projectId Edits the specified project
router.put('/api/projects/:projectId', async (req, res, next) => {
    try {
      // Get the project id
      const { projectId } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }    
  
      // Values to use for updating the project
      const { title, description } = req.body;
  
      const updatedProject = await Project.findByIdAndUpdate(projectId, { title, description }, { new: true });
      
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(500).json(error);
    }
  })

// DELETE /api/projects/:projectId Deletes the specified project
router.delete('/api/projects/:projectId', async(req, res, next) => {
    try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: "Invalid object id" });
        return;
      }  
    
    await Project.findByIdAndDelete(projectId);

    res.status(204).send();
    
    } catch (error) {
    res.status(500).json(error);
}
   
})

module.exports = router;