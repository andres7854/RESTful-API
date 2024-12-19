import mongoose from "mongoose";

//CONNECTION TO DB
mongoose.connect('mongodb://andres:password@mongodb_container:27017/miapp?authSource=admin');

//IMPORTACION DE MODELOS
import { User } from "./models.js";

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