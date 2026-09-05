import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { findUserById } from "../services/user.service";

export const getProfile = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Authenticated user not found",
            });
        }

        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
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