const { Schema, model } = require('mongoose');
const bcryp = require('bcryptjs');

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});

// De forma que podamos cifrar la contraseña, crearemos métodos para cifrarla y guardarla. 

UserSchema.methods.encryptPassword = async password => { // El async necesta estar en el método donde está el await.
    // Dado que es un método asíncrono, no necesitamos esperar, por lo que le ponemos await.
    const salt = await bcryp.genSalt(10);
    return await bcryp.hash(password, salt);
}
// El método que comparará el cifrado de la contraseña guardada con la nueva.
/*
    * El sustituir la función flecha por la función normal, nos permite utilizar this en este Schema, es decir,
    * si el schemna tiene la propiedad «password», podemos hacer referencia a eso dentro del método.
*/
UserSchema.methods.matchPassword = async function (password) {
    return await bcryp.compare(password, this.password);
}

module.exports = model('User', UserSchema);