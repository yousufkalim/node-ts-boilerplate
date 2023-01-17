/**
 * Send email service for forgot password
 * @author Yousuf Kalim
 */
var nodemailer = require('nodemailer');
const senderName = process.env.MAILER_DOMAIN;
const sendEmail = process.env.MAILER_EMAIL;
const senderPassword = process.env.MAILER_PASSWORD;

/**
 * sendEmail
 * @param {string} email
 * @param {string} password
 * @return {void}
 */
exports.sendEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    // Sender mail server config
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: sendEmail,
        pass: senderPassword,
      },
    });

    // Send email options
    var mailOptions = {
      from: `${senderName} <${sendEmail}>`,
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
