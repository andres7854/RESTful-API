import mongoose from "mongoose";

//CONNECTION TO DB
mongoose.connect('mongodb://andres:password@mongodb_container:27017/miapp?authSource=admin');

//MODELS IMPORT
import { User, Token, Task } from "./models.js";

//IMPORTACION DE JWT
import { createToken, validateToken } from "../JWT/tokenUtils.js";

//FUNCTION TO VALIDATE AND CREATE TOKENS
export async function validateTokens(email = String) {
    const userToken = await Token.findOne({email: email});
    const tokenCreated = createToken(email);
    const newUserToken = new Token({email: email, token: tokenCreated});
    if (userToken === null) {
        await newUserToken.save();
        return newUserToken.token;
    } else {
        const validation = validateToken(userToken.token);
        if(validation === 'TokenExpired'){
            await newUserToken.save();
            return `previous token expired new token: ${newUserToken.token}`;
        }else{
            return userToken.token;
        }
    }
}

export async function listTokens() {
    const tokens = await Token.find();
    return tokens;
}

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
        await User.findByIdAndDelete(id);
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
            return 'usuario validado';
        }else{
            return 'contraseña incorrecta';
        }    
    }
}
//FUNCTION TO CREATE A TASK
export async function createTask(title = String, description = String, user = String) {
    const newTask = new Task({title: title, description: description, user: user});
    await newTask.save();
    return newTask;
}