import express from 'express';
import user_routes from './routes/user.js';

// Create app
const app = express();

// Routing
app.use('/', user_routes);

// Port and init server
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`);
});