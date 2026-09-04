import { Request, Response } from "express";
import {
    createUser,
    findUserByEmail,
    verifyPassword,
} from "../services/user.service";
import { generateToken } from "../utils/generateToken";

export const register = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const user = await createUser(email, password);

        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const login = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const passwordIsValid = await verifyPassword(
            password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        const token = generateToken({
            id: user._id.toString(),
            email: user.email,
        });

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