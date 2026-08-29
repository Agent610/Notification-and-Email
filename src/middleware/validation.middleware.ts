import { NextFunction, Request, Response } from "express";

export const validationEmailRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {recipient, subject, message} = req.body ?? {};

    if(!recipient || !subject || !message) {
        return res.status(400).json({
            message: "Recipient, subject, and message are required",
        });
    }

    if (typeof recipient !== "string") {
        return res.status(400).json({
            message: "Recipient must be a string",
        });
    }

      if (typeof recipient !== "string") {
        return res.status(400).json({
            message: "Subject must be a string",
        });
    }

       if (typeof recipient !== "string") {
        return res.status(400).json({
            message: "Message must be a string",
        });
    }

    next ();
};

export const validateAuthRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {email, password} = req.body ?? {};

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }

    if (typeof email !== "string") {
        return res.status(400).json({
            message: "Email must be a string",
        });
    }

        if (typeof password !== "string") {
        return res.status(400).json({
            message: "Password must be a string",
        });
    }

    next();
}