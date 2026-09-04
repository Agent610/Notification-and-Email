import jwt  from "jsonwebtoken";
import { Token } from "nodemailer/lib/xoauth2";

interface TokenPayload {
    id: string;
    email: string;
}

export const generateToken = (
    payload: TokenPayload
): string => {
    return jwt.sign(
        payload, 
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1h",
        }
    );
};