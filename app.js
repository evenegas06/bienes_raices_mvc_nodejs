import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

import user_routes from './routes/userRoutes.js';
import db from './config/database.js';

/* ----- Create app ----- */
const app = express();

/* ----- Enable read form data ----- */
app.use(express.urlencoded({ extended: true }));

/* ----- Enable cookie parser ----- */
app.use(cookieParser());
app.use(csrf({ cookie: true }));

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
    console.log(`Server listening on port ${port} -> ${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}`);
});