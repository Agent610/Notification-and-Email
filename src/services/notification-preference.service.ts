import NotificationPreferenceModel from "../models/NotificationPreference";
import { Types } from "mongoose";

export const getNotificationPreferences = async (
    userId: string
) => {
    let preferences =
        await NotificationPreferenceModel.findOne({
            userId: new Types.ObjectId(userId),
        });

    if (!preferences) {
        preferences =
            await NotificationPreferenceModel.create({
                userId: new Types.ObjectId(userId),
                emailNotifications: true,
                pushNotifications: true,
                marketingEmails: false,
            });
    }

    return preferences;
};

export const updateNotificationPreferences = async (
    userId: string,
    preferences: {
        emailNotifications?: boolean;
        pushNotifications?: boolean;
        marketingEmails?: boolean;
    }
) => {
    return NotificationPreferenceModel.findOneAndUpdate(
        {
            userId: new Types.ObjectId(userId),
        },
        {
            $set: preferences,
        },
        {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true,
        }
    );
};