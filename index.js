import express from 'express';
import { setUsersRoutes } from './userRoutes.js';

export const app = express();
const port = 3000;

// MIDDLEWARE TO PARSE THE BODY OF THE REQUESTS IN JSON FORMAT
app.use(express.json());

app.get('/', async (req, res) => {
    console.log("conectado");
    res.send("hello world");
})

//ESTABLISHING USER ROUTES
setUsersRoutes();

//APP DEPLOY
app.listen(port, () => console.log(`aplicacion desplegada en el puerto ${port}`));