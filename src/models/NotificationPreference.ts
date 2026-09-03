import {Schema, model, Document, Types } from "mongoose";

export interface INotificationPreference extends Document {
    userId: Types.ObjectId;
    emailNotifications: boolean;
    pushNotifications: boolean;
    marketingEmails: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const notificationPreferenceSchema = 
new Schema<INotificationPreference>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        emailNotifications: {
            type: Boolean,
            default: true,
        },
        pushNotifications: {
            type: Boolean,
            default: true,
        },
        marketingEmails: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const NotificationPreference = model<INotificationPreference>(
    "NotificationPreference",
    notificationPreferenceSchema
);

export default NotificationPreference;