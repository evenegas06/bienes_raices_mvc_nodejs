import express from 'express';
import user_routes from './routes/userRoutes.js';
import db from './config/database.js';

/* ----- Create app ----- */
const app = express();

/* ----- Enable read form data ----- */
app.use(express.urlencoded({ extended: true }));

/* ----- DB connection ----- */
try {
    await db.authenticate();
    await db.sync();
    
    console.log('Database connection successful.');

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
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port} -> http://localhost:3000`);
});