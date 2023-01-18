/**
 * Send email service for forgot password
 * @author Yousuf Kalim
 */
import nodemailer from 'nodemailer';
import { MAILER_DOMAIN, MAILER_EMAIL, MAILER_PASSWORD } from 'config';

// Sender mail server config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: MAILER_EMAIL,
    pass: MAILER_PASSWORD,
  },
});

/**
 * sendEmail
 * @param {string} email
 * @param {string} password
 * @return {void}
 */
export const sendEmail = async (email: string, password: string): Promise<object> => {
  return await new Promise((resolve, reject) => {
    // Send email options
    const mailOptions = {
      from: `${MAILER_DOMAIN} <${MAILER_EMAIL}>`,
      to: email,
      subject: 'Your password has been changed',
      text: password,
    };

    // Sending email
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        // Error
        reject(error);
      } else {
        // Success
        resolve({ success: true, message: 'Email sent successfully' });
      }
    });
  });
};
