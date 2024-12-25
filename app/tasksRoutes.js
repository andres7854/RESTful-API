import { app } from "./index.js";

//IMPORT OF USER FUNCTIONS
import { createTask, deleteTask, editTask, listTasks } from './DB/dbUtils.js';

export function setTasksRoutes(){
    //ROUTE TO CREATE A TASK
    app.post('/createTask', async (req, res) => {
        const title = req.body.title;
        const description = req.body.description;
        const userId = req.body.userId;
        try{
            await createTask(title, description, userId);
            res.status(201).send('tarea creada exitosamente');
        }catch(err){
            res.status(400).json('tarea no creadada error: '+err.message);
        }
    });

    //ROUTE TO DELETE A TASK
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

    //ROUTE TO EDIT A TASK
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

    //ROUTE TO LIST ALL TASKS
    app.post('/listTasks', async (req, res) => {
        const userId = req.body.userId;
        try {
            const listOfTasks = await listTasks(userId);
            res.status(201).send(listOfTasks);
        } catch (err) {
            res.status(400).send('no se pudieron listar las tareas error: '+err);
        }
    })
};