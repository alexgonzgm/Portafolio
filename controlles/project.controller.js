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
    },

    getProject: function (req, res) {
        var projectId = req.params.id;

        projectModel.findById(projectId, (err, ProjectFound) => {
            if (err) return res.status(500).send({ Error: err })
            if (!ProjectFound) return res.status(404).send({ messagge: 'Proyecto no guardado' });
            return res.status(200).send({ project: ProjectFound });
        })
    },

    getProjects: function (req, res) {
        projectModel.find().sort('+year').exec((err, Projects) => {
            if (err) return res.status(500).send({ Error: err })
            if (!Projects) return res.status(404).send({ messagge: 'No se encontraron proyectos' });
            return res.status(200).send({ projects: Projects });
        })

    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        projectModel.findByIdAndUpdate(projectId, update, { new: true }, (err, ProjectUpdate) => {
            if (err) return res.status(500).send({ Error: err })
            if (!ProjectUpdate) return res.status(404).send({ messagge: 'Error al actualizar' });
            return res.status(200).send({ project: ProjectUpdate });
        });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;

        projectModel.findByIdAndDelete(projectId, (err, ProjectDelete) => {
            if (err) return res.status(500).send({ Error: err })
            if (!ProjectDelete) return res.status(404).send({ messagge: 'No existe el proyecto a borrar' });
            return res.status(200).send({ project: ProjectDelete });
        });
    }


}

module.exports = controller;