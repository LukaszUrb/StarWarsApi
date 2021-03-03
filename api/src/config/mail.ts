import { Options } from "nodemailer/lib/smtp-connection";
import { IN_PROD } from "./app";

export const {
    SMTP_HOST = "smtp.mailtrap.io",
    SMTP_PORT = 2525,
    SMTP_USERNAME = "test",
    SMTP_PASSWORD = "test",
    MAIL_FROM = "test@test.pl"

} = process.env;

export const SMTP_OPTIONS: Options = {
    host: SMTP_HOST,
    port: +SMTP_PORT,
    secure: IN_PROD,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD
    }
};
