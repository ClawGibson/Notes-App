const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
//* Con los siguientes dos módulos podremos visualizar mensajes al momento de cambiar entre ventana y ventana.
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// todo: INITIALIZATIONS.
const app = express();
require('./config/passport');

// todo: SETTINGS.
app.set('port', process.env.PORT || 4000);
// Otorgamos la dirección de la carpeta «Views» de forma que sea multiplataforma.
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layaoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' // Determinamos la extención de los archivos handlebars.
}));
app.set('view engine', '.hbs'); // Aquí determinamos que se usará el .hbs configurado arriba.

// todo: MIDDLEWARES.
// ! Con el urlencoded le decimos que sea capaz de entender los datos que llegan por formulario html.
app.use(express.urlencoded({ extended: false }));
// * Morgan es un middleware que nos muestra las peticiones que se hacen al servidor, lo cuál es útil.
app.use(morgan('dev'));
// ! Usamos el methodOverride para poder utilizar PUT, DELETE y otros métodos en los formularios.
app.use(methodOverride('_method'));
// ! Configuramos de forma normal session, esto nos guardará los mensajes para verlos entre páginas.
// ! Puesto que flash se basa en este módulo, entonces vamos a requerir luego el módulo flash.
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// De esta manera le agregamos la funcionalidad flash al request.
app.use(flash());


// todo: GLOBAL VARIABLES.
// Definimos nuestro propio middeware para poder acceder al request con el flash y poder mandar mensajes entre vistas.
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); // Esto me devolverá el valor actual de success_msg.
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error'); // Para la autenticación de usuario.
    res.locals.user = req.user || null;
    next();
});

// ROUTES
// ! Hacer lo de abajo evita el poder crear una aplicación que sea escalable, por lo que hacemos lo siguiente:
// app.get('/', (req, res) => {
//     res.render('index');
// });
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));


// STATIC FILES.
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;