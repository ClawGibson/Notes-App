/*
    todo: Este archivo se encarga de mandar mensajes a todos lados :)
*/
const { Router } = require('express');
const router = Router();
// Obtenemos las funciones del notes controller.
const {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');

const { isAuthenticated } = require('../helpers/auth');

//* Es importante agregar esta ruta al server, sino no funcionará.
// todo:  New notes.
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, createNewNote);

// todo: Get all notes.
router.get('/notes', isAuthenticated, renderNotes);

// todo: Edit notes.
// * Especificamos el id para indicar la nota que se va a querer editar, puesto que habrá muchas notas.
// ! En esta sólo mostramos el formulario.
router.get('/notes/edit/:id', isAuthenticated, renderEditForm);
// ! Aquí es donde actualizamos la información de la nota.
router.put('/notes/edit/:id', isAuthenticated, updateNote);

// todo: Delete note.
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;