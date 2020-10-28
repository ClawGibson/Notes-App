const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    const user = await User.findOne({ email });

    if (!user) {
        return done(null, false, 'Not user found');
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, 'Incorrect password.');
        }
    }
}));

// Cuando el usuario es registrado lo guardamos en la sesión del servidor.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Verifica si el usuario tiene autorización, si es encontrado termina la sesión del usuario y obtiene los datos.
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});