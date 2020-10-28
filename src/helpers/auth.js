/*
    * Utilizamos la función isAuthenticated de passport para verificar si está autenticado.
    * En caso de estarlo, sigue con lo siguiente, caso contrario,
    * mandamos un mensaje de error con flash y lo redireccionamos al inicio de sesión.
*/

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'Not Authorized');
    res.redirect('/users/signin');
}

module.exports = helpers;