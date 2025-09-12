import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export interface AuthRequest extends Request {
    user?: any; // You can replace 'any' with a more specific type if needed
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        (req as any).user = decoded; // Attach decoded token to request object
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};