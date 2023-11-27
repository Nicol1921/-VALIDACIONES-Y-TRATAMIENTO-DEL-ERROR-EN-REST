
const express = require('express')
const reviewModel = require("../models/reviewModel ")
const mongoose = require('mongoose')
const Review = require('../models/reviewModel ')
const router = express.Router();

// Obtener todas las reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        if (reviews.length === 0) {
            res.status(400).json({
                success: false,
                msg: 'No hay reviews',
            });
        } else {
            res.status(200).json({
                success: true,
                data: reviews,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error interno del servidor ${error.message}`,
        });
    }
});

// Obtener una review por ID
router.get('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success: false,
                msg: 'ID inválido',
            });
        } else {
            const review = await Review.findById(req.params.id);
            if (!review) {
                res.status(400).json({
                    success: false,
                    msg: `No existe la review con ID ${req.params.id}`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: review,
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

// Crear una nueva review
router.post('/', async (req, res) => {
    try {
        const newReview = await Review.create(req.body);
        res.status(201).json({
            success: true,
            data: newReview,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: `Error interno del servidor ${error.message}`,
        });
    }
});

// Actualizar una review por ID
router.put('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success: false,
                msg: 'ID inválido',
            });
        } else {
            const updatedReview = await Review.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedReview) {
                res.status(400).json({
                    success: false,
                    msg: `No existe la review con ID ${req.params.id}`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: updatedReview,
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

// Eliminar una review por ID
router.delete('/:id', async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({
                success: false,
                msg: 'ID inválido',
            });
        } else {
            const deletedReview = await Review.findByIdAndDelete(req.params.id);
            if (!deletedReview) {
                res.status(400).json({
                    success: false,
                    msg: `No existe la review con ID ${req.params.id}`,
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: deletedReview,
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
