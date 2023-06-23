import express from 'express';
import user_routes from './routes/userRoutes.js';
import db from './config/database.js';

/* ----- Create app ----- */
const app = express();

/* ----- DB connection ----- */
try {
    await db.authenticate();
    console.log('Conexión a la base de datos exitosa.');

} catch (error) {
    console.error(error);
}

/* ----- Template engine ----- */
app.set('view engine', 'ejs');
app.set('views', './views');

/* ----- Public folder (Static files) ----- */
app.use(express.static('./public'));

/* ----- Routing ----- */
app.use('/auth', user_routes);

/* ----- Port and init server ----- */
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port} -> http://localhost:3000`);
});