import {Request, Response } from "express";

export const getProfile = async (
    req: Request,
    res: Response
) => {
    try {
        const userId = req.params.userId;

        if(typeof userId !== "string") {
            return res.status(400).json({
                message: "Invalid userId",
            });
        }

        return res.status(200).json({
            message: "User profile endpoint",
            userId,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};