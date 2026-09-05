import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();


const emailTransporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export default emailTransporter;