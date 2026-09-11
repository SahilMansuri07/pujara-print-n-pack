import nodemailer from "nodemailer";
import { fileURLToPath } from "node:url";
import jwt from "jsonwebtoken";
import "dotenv/config";

const common = {

    async sendEnquiryMail({ toEmail, replyTo, subject, htmlMessage, textMessage }) {
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
        const mailFrom = process.env.MAIL_FROM || smtpUser;
        if (!toEmail || !replyTo || !subject || !htmlMessage) throw new Error("Missing enquiry email fields");
        if (!mailFrom || !smtpUser || !smtpPass) throw new Error("Mail environment is not configured");
        const port = Number(process.env.SMTP_PORT || 587);
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST && process.env.SMTP_HOST !== "smtp.example.com" ? process.env.SMTP_HOST : "smtp.gmail.com",
            port,
            secure: port === 465,
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
            auth: { user: smtpUser, pass: smtpPass },
        });
        const info = await transporter.sendMail({
            from: mailFrom, to: toEmail, replyTo,
            subject: subject.replace(/[\r\n]/g, " "),
            html: htmlMessage, text: textMessage,
            attachments: [{
                filename: "pujara-logo.png",
                path: fileURLToPath(new URL("../assets/logo.png", import.meta.url)),
                cid: "pujara-logo@pujaraprintnpack.com",
                contentType: "image/png",
                contentDisposition: "inline",
            }],
        });
        if (!info.accepted?.length) throw new Error("SMTP did not accept the enquiry notification");
        return { messageId: info.messageId };
    },

    generateToken: async function (user) {
        try {
            const normalizedUser = Array.isArray(user) ? user[0] : user;

            if (!normalizedUser || !normalizedUser.id) {
                throw new Error("Invalid user data for token generation");
            }

            const payload = {
                id: normalizedUser.id,
                name: normalizedUser.name || null,
                email: normalizedUser.email || null,
                mobile_number: normalizedUser.mobile_number || null,
                country_code: normalizedUser.country_code || null,
                login_type: normalizedUser.login_type || null,
                social_id: normalizedUser.social_id || null,
                is_verified: normalizedUser.is_verified ?? null,
                role: normalizedUser.role || null,
            };
            const jwtSecret = process.env.JWT_WEB_TOKEN;
            if (!jwtSecret) {
                throw new Error("JWT_WEB_TOKEN is not configured");
            }

            return jwt.sign(payload, jwtSecret, { expiresIn: "365d" });

        } catch (error) {
            console.log(error);
            throw error;
        }
    },

}

export default common;
