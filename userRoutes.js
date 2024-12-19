import { app } from "./index.js"

//IMPORT OF USER FUNCTIONS
import { createUser, listUsers, deleteUser } from './dbFunctions.js';

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
}