const { Router } = require('express');
const router = Router();

const { renderSignInForm,
    renderSignUpForm,
    signIn,
    signUp,
    logOut } = require('../controllers/users.controller');
// Definimos las rutas del usuario.
router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', signUp);

router.get('/users/signin', renderSignInForm);

router.post('/users/signin', signIn);

router.get('/users/logout', logOut);

module.exports = router;