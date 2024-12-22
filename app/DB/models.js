import mongoose from 'mongoose';

//TOKEN MODEL
export const Token = mongoose.model('Token', new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
}));

//TASK MODEL
export const Task = mongoose.model('Task', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean
    }
}));

 //USER MODEL
export const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: [Task.schema],
        default: []
    }
}));
