var projectModel = require('../models/project.model');
var fileSystem = require('fs');
var path = require('path');

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
            if (!projectSave) return res.status(404).send({ message: 'No se guardo el proyecto!' });
            return res.status(200).send({ project: projectSave });
        })
    },

    getProject: function (req, res) {
        var projectId = req.params.id;

        projectModel.findById(projectId, (err, ProjectFound) => {
            if (err) return res.status(500).send({ Error: err })
            if (!ProjectFound) return res.status(404).send({ message: 'Proyecto no guardado' });
            return res.status(200).send({ project: ProjectFound });
        })
    },

    getProjects: function (req, res) {
        projectModel.find().sort('+year').exec((err, Projects) => {
            if (err) return res.status(500).send({ Error: err })
            if (!Projects) return res.status(404).send({ message: 'No se encontraron proyectos' });
            return res.status(200).send({ projects: Projects });
        })

    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        projectModel.findByIdAndUpdate(projectId, update, { new: true }, (err, ProjectUpdate) => {
            if (err) return res.status(500).send({ Error: err })
            if (!ProjectUpdate) return res.status(404).send({ message: 'Error al actualizar' });
            return res.status(200).send({ project: ProjectUpdate });
        });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;

        projectModel.findByIdAndDelete(projectId, (err, ProjectDelete) => {
            if (err) return res.status(500).send({ Error: err })
            if (!ProjectDelete) return res.status(404).send({ message: 'No existe el proyecto a borrar' });
            return res.status(200).send({ project: ProjectDelete });
        });
    },

    uploadImage: function (req, res) {
        if (req.files) { //gracias a connect Multiparty 
            var imagePath = req.files.image.path;
            var pathSplit = imagePath.split('\\'); // uploads\\nombreImagen.jpg
            var imageUpdate = pathSplit[1];
            var imageSplit = imageUpdate.split('.');
            var extension = imageSplit[1];
            var projectId = req.params.id;
            if (extension == 'jpg' || extension == 'jpeg' || extension == 'gif' || extension == 'png') {
                projectModel.findByIdAndUpdate(projectId, { image: imageUpdate }, { new: true }, (err, ProjectUpdate) => {
                    if (err) return res.status(500).send({ Error: err })
                    if (!ProjectUpdate) return res.status(404).send({ messagge: 'Error al actualizar' });
                    return res.status(200).send({ project: ProjectUpdate });
                });
            } else {
                fileSystem.unlink(imagePath, (err) => {
                    return res.status(200).send({ message: 'Extension incorrecta' });
                });
            }

        } else {
            return res.status(200).send({ message: "No hay archivos" });
        }
    },

    getImage: function (req, res) {
        var image = req.params.image;
        var pathImage = './uploads/' + image;
        fileSystem.exists(pathImage, (exist) => {
            if (exist) {
                return res.sendFile(path.resolve(pathImage));
            } else {
                return res.status(200).send({ message: 'No existe la imagen ...' });
            }

        })
    }

}

module.exports = controller;