var nodemailer = require("nodemailer");
const sender_name = process.env.MAILER_DOMAIN;
const sender_email = process.env.MAILER_EMAIL;
const sender_password = process.env.MAILER_PASSWORD;

exports.sendEmail = (email, password) => {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: sender_email,
        pass: sender_password,
      },
    });

    var mailOptions = {
      from: `${sender_name} <${sender_email}>`,
      to: email,
      subject: "Your password has been changed",
      text: password,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve({ success: true, message: "Email sent successfully" });
      }
    });
  });
};
