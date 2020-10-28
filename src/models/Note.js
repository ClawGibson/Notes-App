const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: String, required: true }
}, {
    timestamps: true // Añade la propiedad de cuando fue creado y cuando fue actualizado.
})

module.exports = model('Note', NoteSchema);