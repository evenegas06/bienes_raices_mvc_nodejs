import express from 'express';
import user_routes from './routes/user.js';

// Create app
const app = express();

// Habilitar el motor de plantillas
app.set('view engine', 'ejs');
app.set('views', './views');

// Routing
app.use('/auth', user_routes);

// Port and init server
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port} -> http://localhost:3000`);
});