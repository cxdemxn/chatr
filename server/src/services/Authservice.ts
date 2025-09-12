import config from "../config";
import { getRepository } from "../config/data-source";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class {
    private userRepoistory = getRepository(User);

    async register(email: string, username: string, password: string) {
        const existingUser = await this.userRepoistory.find({ where: { email } });
        if (existingUser.length > 0) {
            throw new Error("Email or username already in use");
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = this.userRepoistory.create({ email, name: username, password: hashedPassword });
        await this.userRepoistory.save(newUser);

        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, config.JWT_SECRET, { expiresIn: "1h" });
        
        return { newUser, token};
    }

    async login(email: string, password: string) {
        console.log()
        const user = await this.userRepoistory.findOne({ where: { email } });
        console.log('user found:', user);
        
        if (!user) {
            console.log('is error here?');
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log('or is error here?');
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, config.JWT_SECRET, { expiresIn: "1h" });

        return { user, token };
    }

    async verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, config.JWT_SECRET);
            return decoded;
        } catch (err) {
            throw new Error("Invalid token");
        }
    }

    async getUserById(userId: number) {
        const user = await this.userRepoistory.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}