import {Schema, model, Document, Types} from "mongoose";

export interface IEmail extends Document {
    userId: Types.ObjectId;
    recipient: string;
    subject: string;
    message: string;
    status: "pending" | "sent" | "failed";
    error?: string;
    sentAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const emailSchema = new Schema<IEmail>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipient: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "sent", "failed"],
            default: "pending",
        },
        error: {
            type: String,
        },
        sentAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const Email = model<IEmail>("Email", emailSchema);

export default Email;