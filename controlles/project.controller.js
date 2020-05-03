var projectModel = require('../models/project.model');

var controller = {
    saveProject: function (req, res) {
        var requestBody = req.body;

        var project = new projectModel();
        project.name = requestBody.name;
        project.description = requestBody.description;
        project.category = requestBody.category;
        project.langs = requestBody.langs;
        project.year = requestBody.year;
        project.image = requestBody.image;

        project.save((err, projectSave) => {
            if (err) return res.status(500).send({ Error: err })
            if (!projectSave) return res.status(404).send({ messagge: 'No se guardo el proyecto!' });
            return res.status(200).send({ project: projectSave });
        })
    }
}

module.exports = controller;