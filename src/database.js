const mongoose = require('mongoose');
// Gracias a env podemos esconder datos que son más delicados, dado que el .env nunca se subirá al reposotorio ni a producción, sólo estará en desarrollo.
//const mongodb_uri = process.env.mongodb_uri;
/*
const notes_app_mongodb_host = process.env.notes_app_mongodb_host;
const notes_app_mongodb_database = process.env.notes_app_mongodb_database; 
*/
// Esto también se puede hacer de la siguiente forma:
const { notes_app_mongodb_host, notes_app_mongodb_database } = process.env;
const mongodb_uri = `mongodb://${notes_app_mongodb_host}/${notes_app_mongodb_database}`;

mongoose.connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => {
        console.log('Database is connected.');
    })
    .catch(err => {
        console.log(err);
    });