import {Request, Response} from "express";
import { createNotification, getUserNotifications, markNotificationAsRead } from "../services/notification.service";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export const create = async (
    req: AuthenticatedRequest, res: Response
) => {
    try {
        const {title, message, type} = req.body ?? {};

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Authenticated user not found",
            });
        }

        if (!title || !message) {
            return res.status(400).json({
                message: "Title and message are required",
            });
        }

        const notification = await createNotification(
            userId,
            title,
            message,
            type
        );

        return res.status(201).json({
            message: "Notification created successfully",
            notification,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if(typeof userId !== "string") {
        return res.status(400).json({
            message: "Invalid userId",
        });
    }

    const notifications = await getUserNotifications(userId);

    return res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
    try {
        const {notificationId} = req.params;

        if (typeof notificationId !== "string") {
            return res.status(400).json({
                message: "Invalid notificationId",
            });
        }
        
        const notification = await markNotificationAsRead(notificationId);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found",
            });
        }

        return res.status(200).json({
            message: "Notification marked as read",
            notification,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
}

