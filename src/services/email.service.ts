import emailTransporter from "../config/email";

export interface EmailData {
    recipient: string;
    subject: string;
    message: string;
}

export const sendEmailService = async (
    emailData: EmailData
): Promise<void> => {
    const {recipient, subject, message} = emailData;

    await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipient,
        subject,
        text: message,
    });
  };