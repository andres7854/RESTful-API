import mongoose from "mongoose";

//CONNECTION TO DB
mongoose.connect('mongodb://andres:password@mongodb_container:27017/miapp?authSource=admin');

//MODELS IMPORT
import { User, Token, Task } from "./models.js";

//TOKENS FUNCTIONS

    //IMPORTACION DE JWT
    import { createToken, validateToken } from "../JWT/tokenUtils.js";

    //FUNCTION TO VALIDATE AND CREATE TOKENS
    export async function validateTokens(email = String) {
        const userToken = await Token.findOne({email: email});
        const tokenCreated = createToken(email);
        const newUserToken = new Token({email: email, token: tokenCreated});
        if (userToken === null) {
            await newUserToken.save();
            return tokenCreated;
        } else {
            const validation = validateToken(userToken.token);
            if(validation === 'TokenExpired'){
                await Token.findOneAndUpdate({email: email}, {$set:{token: tokenCreated}});
                return tokenCreated;
            }else{
                return userToken.token;
            }
        }
    }

    //FUNCTION TO VALIDATE A TOKEN
    export async function validateTokenExpiration(token = String) {
        const tokenValidation = validateToken(token);
        return tokenValidation;
    }

    //FUNCTION TO LIST ALL TOKENS
    export async function listTokens() {
        const tokens = await Token.find();
        return tokens;
    }

//USER FUNCTIONS

    //FUNCTION TO CREATE AND SAVE A USER IN THE DB
    export async function createUser(username = String, email = String ,password = String) {
        const newUser = new User({username: username, email: email, password: password})
        await newUser.save();
        return newUser;
    }

    //FUNCTION TO LIST ALL USERS
    export async function listUsers() {
        const users = await User.find();
        return users;
    }

    //FUNCTION TO DELETE A USER
    export async function deleteUser(id = String) {
        try{
            const userToDelete = await User.findByIdAndDelete(id);
            await Token.findOneAndDelete({email: userToDelete.email});
            return 'usuario eliminado correctamente';
        }catch(err){
            return `usuario no encontrado error:${err.message}`;
        }
    }

    //FUNCTION TO VALIDATE A USER
    export async function validateUser(email = String, password = String) {  
        const user = await User.findOne({email: email});
        if (user === null){
            return 'usuario no encontrado';
        } else {
            var bdPassword = user.password;
            if(password === bdPassword){
                return user.id;
            }else{
                return 'contraseña incorrecta';
            }    
        }
    }

//TASKS FUNCTIONS

    //FUNCTION TO CREATE A TASK
    export async function createTask(title = String, description = String, userId = String) {
        if (!userId) {
            throw new Error('id del usuario no proporcionado');
        }
        const newTask = new Task({title: title, description: description, status: false});
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            await User.findByIdAndUpdate(userId, {$push: {tasks: newTask}});
            return newTask;
        } catch (err) {
            throw new Error('tarea no creada error: '+err.message);
        }
    }

    //FUNCTION TO DELETE A TASK
    export async function deleteTask(userId = String, taskId = String) {
        try {
            const previousUser = await User.findById(userId);
            const newUser = await User.findByIdAndUpdate(userId, {$pull: { tasks: { _id: taskId } }}, {new: true});
            return (previousUser.tasks.length > newUser.tasks.length) ? 'tarea eliminada correctamente' : 'tarea no existente';
        } catch (err) {
            return `tarea no eliminada error: ${err}`
        }
    }

    //FUNCTION TO EDIT A TASK
    export async function editTask(userId, taskId, taskTitle, taskDescription, taskStatus){
        try {
            await User.findOneAndUpdate(
                {_id: userId, "tasks._id": taskId},
                {
                    $set:{
                        "tasks.$.title": taskTitle,
                        "tasks.$.description": taskDescription,
                        "tasks.$.status": taskStatus
                    }
                }
            );
            return 'tarea editada correctamente'
        } catch (err) {
            return 'tarea o usuario no encontrados error: '+err;
        }
    }

    //FUNCTION TO LIST ALL TASKS
    export async function listTasks(userId) {
        try {
            const user = await User.findById(userId);
            return user.tasks;
        } catch (err) {
            return err;
        }
    }