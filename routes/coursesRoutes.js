const express = require('express');
const coursesModel = require("../models/coursesModel")
const mongoose = require('mongoose');
const Course = require('../models/coursesModel');


const router = express.Router();

// Obtener todos los cursos
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        if (courses.length === 0) {
            res.status(400).json({
                success: false,
                msg: 'No hay cursos',
            });
        } else {
            res.status(200).json({
                success: true,
                data: courses,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error interno del servidor ${error.message}`,
        });
    }
});

// Obtener un curso por ID
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success: false,
                msg: 'ID inválido',
            });
        } else {
            const course = await Course.findById(req.params.id);
            if (!course) {
                res.status(400).json({
                    success: false,
                    msg: `No existe el curso con ID ${req.params.id}`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: course,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error interno del servidor ${error.message}`,
        });
    }
});

// Crear un nuevo curso
router.post('/', async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json({
            success: true,
            data: newCourse,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error interno del servidor ${error.message}`,
        });
    }
});

// Actualizar un curso por ID
router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success: false,
                msg: 'ID inválido',
            });
        } else {
            const updatedCourse = await Course.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedCourse) {
                res.status(400).json({
                    success: false,
                    msg: `No existe el curso con ID ${req.params.id}`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: updatedCourse,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error interno del servidor ${error.message}`,
        });
    }
});

// Eliminar un curso por ID
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success: false,
                msg: 'ID inválido',
            });
        } else {
            const deletedCourse = await Course.findByIdAndDelete(req.params.id);
            if (!deletedCourse) {
                res.status(400).json({
                    success: false,
                    msg: `No existe el curso con ID ${req.params.id}`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: deletedCourse,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error interno del servidor ${error.message}`,
        });
    }
});

module.exports = router;
