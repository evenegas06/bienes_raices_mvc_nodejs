import express from 'express';
import user_routes from './routes/userRoutes.js';

/* ----- Create app ----- */
const app = express();

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