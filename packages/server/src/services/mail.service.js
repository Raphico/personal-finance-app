import { createTransport } from "nodemailer";
import Mailgen from "mailgen";
import { env } from "../config.js";
import { logger } from "../logging.js";

/**
 * Sends an email using the provided details and mailgen content
 * @async
 * @export
 * @param {{ emailContent: Mailgen.Content; to: string; subject: string; }} options
 */
export async function sendEmail({ emailContent, to, subject }) {
  try {
    const transport = createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_HOST == 465,
      auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
      },
    });

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Personal finance app",
        link: env.CLIENT_URL,
      },
    });

    // Generate an HTML email with the provided contents
    const emailBody = mailGenerator.generate(emailContent);

    // Generate the plaintext version of the e-mail (for clients that do not support HTML)
    const emailText = mailGenerator.generatePlaintext(emailContent);

    await transport.sendMail({
      from: env.SENDER_EMAIL_ADDRESS,
      to,
      subject,
      text: emailText,
      html: emailBody,
    });
  } catch (error) {
    // As sending email is not strongly coupled to the business logic it is not worth to raise an error when email sending fails
    // So it's better to fail silently rather than breaking the app
    logger.error(
      "Email service failed silently. Make sure you have provided your SMTP credentials in the .env file"
    );
    logger.error(error);
  }
}

/**
 * Generates the email content template for user email verification
 * @export
 * @param {{ username: string; emailVerificationCode: string }} options
 * @returns { Mailgen.Content }
 */
export function emailVerificationTemplate({ username, emailVerificationCode }) {
  return {
    body: {
      name: username,
      intro:
        "Enter this temporary verification code to continue and fully access your account:",
      action: {
        button: {
          color: "#201F24",
          text: `${emailVerificationCode}`,
          link: "#",
        },
      },
      outro: [
        `Please note that this code will expire shortly. If the code has expired, you can request a new verification code by visiting our website.`,
        `If you didn’t create an account with us, you can safely ignore this email.`,
      ],
    },
  };
}
