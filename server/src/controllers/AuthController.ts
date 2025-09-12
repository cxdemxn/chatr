import { Request, Response } from "express";
import AuthService from "../services/Authservice";

export default class AuthController {
    private authService = new AuthService();

    public register = async (req: Request, res: Response) => {
        console.log("Register endpoint hit with body:", req.body);
        try {
            const { username, email, password } = req.body;
            const user = await this.authService.register(email, username, password);
            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    };

    public verifyToken = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ error: "No token provided" });
            }
            const decoded = await this.authService.verifyToken(token);
            res.status(200).json({ message: "Token is valid", decoded });
        } catch (error) {
            res.status(401).json({ error: (error as Error).message });
        }
    };

    public getUserProfile = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.authService.getUserById(userId);
            res.status(200).json({ user });
        } catch (error) {
            res.status(404).json({ error: (error as Error).message });
        }
    };
}