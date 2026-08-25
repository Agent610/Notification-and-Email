import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { createUser } from "../services/user.service";

export const register = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body ?? {};

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await createUser(email,password);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user.id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }   
}

export const login = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body ?? {};

        if (!email || !password) {
           return res.status(400).json({
            message: "Email and password are required",
           }); 
        }

        const token = jwt.sign(
            {email}, 
            process.env.JWT_SECRET as string,
            {expiresIn: "1h"}
        );

        return res.status(200).json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};