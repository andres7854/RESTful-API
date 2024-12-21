import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function createToken(email = String) {
    return jwt.sign(
        {
            email: email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )
}

export function validateToken(token = String) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return 'TokenExpired';
        }
        return error;
    }
}