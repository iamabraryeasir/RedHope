/**
 * Node Modules
 */
import ejs from 'ejs';
import path from 'node:path';
import nodemailer from 'nodemailer';

/**
 * Local Modules
 */
import config from '@/config';
import { AppError } from '@/errorHelpers/AppError';

/**
 * Types
 */
interface SendEmailOption {
    to: string;
    subject: string;
    templateName: string;
    templateData?: Record<string, any>;
    attachments?: {
        filename: string;
        content: Buffer | string;
        contentType: string;
    }[];
}

/**
 * Confider Mail Transporter
 */
const transport = nodemailer.createTransport({
    host: config.EMAIL_SENDER.SMTP_HOST,
    port: Number(config.EMAIL_SENDER.SMTP_PORT),
    secure: true,
    auth: {
        user: config.EMAIL_SENDER.SMTP_USER,
        pass: config.EMAIL_SENDER.SMTP_PASS,
    },
});

export const sendEmail = async ({
    to,
    subject,
    attachments,
    templateName,
    templateData,
}: SendEmailOption) => {
    try {
        const templatePath = path.join(
            __dirname,
            `templates/${templateName}.ejs`,
        );
        const html = await ejs.renderFile(templatePath, templateData);

        const info = await transport.sendMail({
            from: config.EMAIL_SENDER.SMTP_FROM,
            to: to,
            subject: subject,
            html: html,
            attachments: attachments?.map((attachment) => ({
                filename: attachment.filename,
                content: attachment.content,
                contentType: attachment.contentType,
            })),
        });

        console.log(`\u2709\uFE0F Email send to ${to}: ${info.messageId}`);
    } catch (error: any) {
        throw new AppError(401, `Email sending error ${error?.message}`);
    }
};
