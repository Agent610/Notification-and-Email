import emailTransporter from "../config/email";
import EmailModel from "../models/Email";
import { Types } from "mongoose";
import { loadEmailTemplate } from "../utils/emailTemplate";

export interface EmailData {
    userId: string;
    recipient: string;
    subject: string;
    message: string;
    templateName?: string;
    templateVariables?: Record<string, string>;
}

export const sendEmailService = async (
    emailData: EmailData
): Promise<void> => {
    const {
        userId,
        recipient,
        subject,
        message,
        templateName,
        templateVariables = {},
    } = emailData;

    const email = await EmailModel.create({
        userId: new Types.ObjectId(userId),
        recipient,
        subject,
        message,
        status: "pending",
    });

    try {
        const html = templateName
            ? loadEmailTemplate(
                  templateName,
                  templateVariables
              )
            : undefined;

        await emailTransporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient,
            subject,
            text: message,
            html,
        });

        email.status = "sent";
        email.sentAt = new Date();

        await email.save();
    } catch (error) {
        email.status = "failed";
        email.error =
            error instanceof Error
                ? error.message
                : "Unknown email error";

        await email.save();

        throw error;
    }
};