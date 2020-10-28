/*
    En este archivo definimos las rutas que tendrá la página.
    Antes de renderizar, se harán consultas a bases de datos y otro tipo de procesos, por lo cual
    será necesario implementar controladores desde la carpeta controllers.

    Esto nos sirve para poder mantener la aplicación en caso de que crezca.
*/

const { Router } = require('express');

const router = Router();
const { renderAbout, renderIndex } = require('../controllers/index.controllers')

// router.get('/', (req, res) => {
//     res.render('index');
// });
router.get('/', renderIndex);


router.get('/about', renderAbout);

module.exports = router;