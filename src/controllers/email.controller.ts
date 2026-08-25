import { Request, Response } from "express";
import { sendEmailService } from "../services/email.service";

export const sendEmail = async (req: Request, res: Response) => {
    try {
        const {recipient, subject, message} = req.body;

        if(!recipient || !subject || !message) {
            return res.status(400).json({
                message: "Recipient, subject, and message are required",
            });
        }

        const email = await sendEmailService({
            recipient,
            subject,
            message,
        });

        return res.status(200).json({
            message: "Email request received",
            email,
            });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};