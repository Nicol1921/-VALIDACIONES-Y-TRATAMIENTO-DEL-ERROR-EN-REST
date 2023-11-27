const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título del curso es requerido'],
        minlength: [10, 'El título del curso debe tener al menos 10 caracteres'],
        maxlength: [30, 'El título del curso no puede exceder los 30 caracteres'],
    },
    description: {
        type: String,
        required: [true, 'La descripción del curso es requerida'],
        minlength: [10, 'La descripción del curso debe tener al menos 10 caracteres'],
    },
    weeks: {
        type: Number,
        required: [true, 'Las semanas del curso son requeridas'],
        validate: {
            validator: function (value) {
                return value >= 1 && value <= 9;
            },
            message: 'El número de semanas debe estar entre 1 y 9',
        },
    },
    enroll_cost: {
        type: Number,
        required: [true, 'El costo de inscripción es requerido'],
    },
    minimum_skill: {
        type: String,
        required: [true, 'El nivel de habilidad mínimo es requerido'],
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
