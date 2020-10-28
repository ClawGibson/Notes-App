const notesController = {};
// todo: Importamos el modelo que usaremos para guardar los datos de la nota en la base de datos.
const Note = require('../models/Note');

notesController.renderNoteForm = (req, res) => {
    //console.log(req.user);
    //res.send('note add');
    res.render('notes/new-note');
}

notesController.createNewNote = async (req, res) => {
    // * Request porque cuando nosotros enviamos datos, hacemos una petición.
    // ! Extraeremos una propiedad del request body.
    const { title, description } = req.body;
    // todo: Puede hacerse de las siguientes formas y ambas son correctas.
    //new Note({ title: title, description: description });
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    /* 
        * Este newNote.save() lo que hace s guardar la nota dentro de mongodb en una colección que definimos con
        * mongoose en la carpeta models/Note.js
        * 
        ! Puesto que estamos operando de forma asíncrona con la bd, por lo que vamos a necesitar hacer una promesa,
        ! un callback o algo más moderno como async await.
        */
    await newNote.save();
    // Nombre, valor del mensaje.
    req.flash('success_msg', 'Note Added Succesfully');
    res.redirect('/notes');
}

notesController.renderNotes = async (req, res) => {
    // ! Es necesario incluir el método lean puesto que mongoose regresa una instancia Mongoose Document,
    // ! Lo que hacemos con lean es transformar ese formato a JSON para que pueda ser entendido por la web.
    // ! Filtamos las notras con req.user.id para sólo ver aquellas que pertenezcan al id del usuario en sesión.
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();
    // Colocamos el objeto con las notas a all-notes.
    res.render('notes/all-notes', { notes });
}

notesController.renderEditForm = async (req, res) => {
    // * Realizamos la consulta a la base de datos para obtener los resultados.
    const note = await Note.findById(req.params.id).lean();
    if (note.user != req.user.id) {
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note', { note });
}

notesController.updateNote = async (req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
}

notesController.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Deleted Successuflly');
    res.redirect('/notes');
}

module.exports = notesController;