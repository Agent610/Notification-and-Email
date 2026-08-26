import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    email: string;
}

export interface AuthenticatedRequest extends Request {
    user? : JwtPayload;
}

export const authenticate = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

         const token = authHeader.split("")[1];

         if(!token) {
            return res.status(401).json({
                message: "Authentication token is missing",
            });
         }

         const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
         ) as JwtPayload;

         req.user = decoded;

         next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};