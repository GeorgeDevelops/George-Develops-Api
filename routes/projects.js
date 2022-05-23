const express = require('express');
const router = express.Router();
const Project = require('./../models/project');
const logger = require('./../middlewares/logger');
const cors = require('cors');

router.post('/new/project', cors(), async (req, res) => {
    Object.keys(req.body).forEach(key => {
        if (!req.body[key] || req.body[key] == '') return res.status(400).send(`${key} is required.`);
    });

    try {
        let { name, description, github, url, imageUrl} = req.body;
        const project = new Project({
            name: name,
            description: description,
            github: github,
            url: url, 
            imageUrl: imageUrl
        });
        
        project.save();
        return res.status(200).send(project);

    } catch (error) {
        logger.error("ERROR: " + error);
        return res.status(500).send(error);
    }
});

router.get('/projects', cors(), async (req, res) => {
    try {
        const projects = await Project.find({});
        if (projects.length < 1) return res.status(404).send("No projects found.")

        res.status(200).send(projects);
    } catch (error) {
        logger.error("ERROR: " + error);
        return res.status(500).send(error);
    }
});

module.exports = router;