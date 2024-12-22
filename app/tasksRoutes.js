import { app } from "./index.js";

//IMPORT OF USER FUNCTIONS
import { createTask, deleteTask, editTask } from './DB/dbUtils.js';

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

    app.delete('/deleteTask', async (req, res) => {
        const userId = req.body.userId;
        const taskId = req.body.taskId;
        try{
            const deleteState = await deleteTask(userId, taskId);
            res.status(201).send(deleteState);
        }catch(err){
            res.status(400).send('error: '+err.message);
        }

    });

    app.patch('/editTask', async (req, res) => {
        const userId = req.body.userId;
        const taskId = req.body.taskId;
        const taskTitle = req.body.title;
        const taskDescription = req.body.description;
        const taskStatus = req.body.status;
        try {
            const editState = await editTask(userId, taskId, taskTitle, taskDescription, taskStatus);
            res.status(201).send(editState);
        } catch (err) {
            res.status(400).send('error: '+err.message);
        }
    })
};