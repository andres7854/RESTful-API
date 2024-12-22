import { app } from "./index.js";

//IMPORT OF USER FUNCTIONS
import { createTask } from './DB/dbUtils.js';

export function setTasksRoutes(){
    //ROUTE TO CREATE A TASK
    app.post('/createTask', async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const status = req.body.status;
        const id = req.body.id;
        try{
            const newTask = await createTask(title, description, status, id);
            res.status(201).json(newTask);
        }catch(err){
            res.status(400).json({error: err.message});
        }
    });
};