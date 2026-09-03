import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
    getNotificationPreferences,
    updateNotificationPreferences,
} from "../services/notification-preference.service";

export const getPreferences = async (
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

        const preferences =
            await getNotificationPreferences(userId);

        return res.status(200).json({
            preferences,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updatePreferences = async (
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

        const {
            emailNotifications,
            pushNotifications,
            marketingEmails,
        } = req.body ?? {};

        const preferences =
            await updateNotificationPreferences(
                userId,
                {
                    emailNotifications,
                    pushNotifications,
                    marketingEmails,
                }
            );

        return res.status(200).json({
            message: "Notification preferences updated successfully",
            preferences,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};