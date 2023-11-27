const mongoose = require('mongoose');

// Esquema para Reviews
const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título de la revisión es requerido"],
        maxlength: [20, "El título debe tener como máximo 20 caracteres"]
    },
    text: {
        type: String,
        required: [true, "El texto de la revisión es requerido"],
        maxlength: [50, "El texto debe tener como máximo 50 caracteres"]
    },
    rating: {
        type: Number,
        required: [true, "La calificación es requerida"],
        min: [1, "La calificación debe ser al menos 1"],
        max: [10, "La calificación no puede ser mayor a 10"]
    }
});

// Modelo para Reviews
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
