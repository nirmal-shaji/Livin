import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secretKey = process.env.JWT_KEY;

const authMiddleware = async (req, res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
        const decoded = jwt.verify(token, secretKey);
        req.body._id = decoded?.id;
        next()
    }
}