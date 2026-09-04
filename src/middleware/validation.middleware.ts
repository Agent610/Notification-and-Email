import { NextFunction, Request, Response } from "express";
import {
    isNonEmptyString,
    isValidEmail,
    isValidNotificationType,
    isValidPassword,
} from "../utils/validators";

export const validateEmailRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { recipient, subject, message } = req.body ?? {};

    if (
        !isNonEmptyString(recipient) ||
        !isNonEmptyString(subject) ||
        !isNonEmptyString(message)
    ) {
        return res.status(400).json({
            message:
                "Recipient, subject, and message are required",
        });
    }

    if (!isValidEmail(recipient)) {
        return res.status(400).json({
            message: "Invalid recipient email address",
        });
    }

    next();
};

export const validateAuthRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body ?? {};

    if (
        !isNonEmptyString(email) ||
        !isNonEmptyString(password)
    ) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({
            message: "Invalid email address",
        });
    }

    if (!isValidPassword(password)) {
        return res.status(400).json({
            message: "Password must be at least 8 characters",
        });
    }

    next();
};

export const validateNotificationRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { title, message, type } = req.body ?? {};

    if (
        !isNonEmptyString(title) ||
        !isNonEmptyString(message)
    ) {
        return res.status(400).json({
            message: "Title and message are required",
        });
    }

    if (
        type !== undefined &&
        !isValidNotificationType(type)
    ) {
        return res.status(400).json({
            message:
                "Invalid notification type. Use info, success, warning, or error",
        });
    }

    next();
};