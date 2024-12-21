import { app } from "./index.js";

//IMPORT OF USER FUNCTIONS
import { createTask } from './DB/dbUtils.js';

app.post('/createTask', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const user = req.body.user;
    try{
        const newTask = await createTask(title, description, user);
        res.status(201).json(newTask);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});