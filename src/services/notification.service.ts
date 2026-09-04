import { Types } from "mongoose";
import NotificationModel from "../models/Notification";

export const createNotification = async (
    userId: string,
    title: string,
    message: string,
    type: "info" | "success" | "warning" | "error" = "info"
) => {
    const notification = await NotificationModel.create({
        userId: new Types.ObjectId(userId),
        title,
        message,
        type,
        read: false,
    });

    return notification;
};

export const getUserNotifications = async (
    userId: string
) => {
    return NotificationModel.find({
        userId: new Types.ObjectId(userId),
    }).sort({ createdAt: -1 });
};

export const markNotificationAsRead = async (
    notificationId: string,
    userId: string
) => {
    return NotificationModel.findOneAndUpdate(
        {
            _id: new Types.ObjectId(notificationId),
            userId: new Types.ObjectId(userId),
        },
        {
            read: true,
        },
        {
            new: true,
        }
    );
};