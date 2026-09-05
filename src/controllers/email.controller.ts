import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import { sendEmailService } from "../services/email.service";

export const sendEmail = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const {
            recipient,
            subject,
            message,
            templateName,
            templateVariables,
        } = req.body;

        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                message: "Authenticated user not found",
            });
        }

        await sendEmailService({
            userId,
            recipient,
            subject,
            message,
            templateName,
            templateVariables,
        });

        return res.status(200).json({
            message: "Email sent successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to send email",
        });
    }
};