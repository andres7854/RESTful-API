import express from 'express';
import cors from 'cors';
import path from 'path';
import { setUsersRoutes } from './userRoutes.js';
import { setTasksRoutes } from './tasksRoutes.js';
import { fileURLToPath } from 'url';

export const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARE TO ALLOW CROSS ORIGIN REQUESTS
app.use(cors());
// MIDDLEWARE TO PARSE THE BODY OF THE REQUESTS IN JSON FORMAT
app.use(express.json());
//MIDDLEWARE TO SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'staticWeb')));

app.get('/', async (req, res) => {
    res.sendFile(`${__dirname}/staticWeb/index.html`);
})

app.get('/login', async (req, res) => {
    res.sendFile(`${__dirname}/staticWeb/logIn.html`);
})

app.get('/signUp', async (req, res) => {
    res.sendFile(`${__dirname}/staticWeb/signUp.html`);
})

app.get('/app', async (req, res) => {
    res.sendFile(`${__dirname}/staticWeb/app.html`);
});

//SET UP THE USER ROUTES
setUsersRoutes();

//SET UP THE TASKS ROUTES
setTasksRoutes();

//APP DEPLOY
app.listen(port, () => console.log(`aplicacion desplegada en el puerto ${port}`));