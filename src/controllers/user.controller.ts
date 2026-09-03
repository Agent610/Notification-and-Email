import {Request, Response } from "express";
import { findUserById } from "../services/user.service";

export const getProfile = async (
    req: Request,
    res: Response
) => {
    try {
        const {userId} = req.params;

        if(typeof userId !== "string") {
            return res.status(400).json({
                message: "Invalid userId",
            });
        }

        const user = await findUserById(userId);

        if(!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
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
};