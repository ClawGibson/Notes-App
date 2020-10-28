// Creamos el objeto.
const usersCtrl = {};
const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}

usersCtrl.signUp = async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_Password } = req.body;
    if (password != confirm_Password) {
        errors.push({ text: 'Password do not match.' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Passwords must be at least 3 characters.' });
    }
    if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use.');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered.');
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSignInForm = (req, res) => {
    res.render('users/signin');
}

/*
    * Haremos uso de passport puesto que este se encarga de guardar la lógica relacionada con la autenticación.
    * Es un módulo que guarda las funciones para poder ingresar, registrar y guardar la sesión en la memoria del servidor.
    * En cada página deberemos mantener al usuario logeado.
*/

// usersCtrl.signIn = (req, res) => {
//     res.send('sign in');
// }
usersCtrl.signIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});

usersCtrl.logOut = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.');
    res.redirect('/users/signin');
}

module.exports = usersCtrl;