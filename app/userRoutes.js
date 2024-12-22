import { app } from "./index.js"

//IMPORT OF USER FUNCTIONS
import { validateTokens, createUser, listUsers, deleteUser, validateUser, listTokens } from './DB/dbUtils.js';

export function setUsersRoutes() {
    //LIST USERS ROUTE
    app.get('/listUsers', async(req, res) => {
        const users = await listUsers();
        res.send(users);
    })
    //CREATE USER ROUTE
    app.post('/createUser', async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        try{
            const newUser = await createUser(username, email, password);
            res.status(201).json(newUser);
        }catch(err){
            res.status(400).json({error: err.message});
        }
    })
    //DELETE USER ROUTE
    app.delete('/deleteUser', async (req, res) => {
        const deleteState = await deleteUser(req.query.id);
        res.send(deleteState);
    })
    //FUNCTION TO VALIDATE A USER
    app.post('/validateUser', async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        const userValidation = await validateUser(email, password);
        if (userValidation != 'contraseña incorrecta'){
            const token = await validateTokens(email);
            res.send({id: userValidation, token: token});
        }else{
            res.send(userValidation);
        }
    })

    app.get('/listTokens', async (req, res) => {
        const tokens = await listTokens();
        res.send(tokens);
    })
}