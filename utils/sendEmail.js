var nodemailer = require("nodemailer");
const sender_email = process.env.EMAIL;
const sender_password = process.env.PASSWORD;

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
      from: `Falcon Consulting <${sender_email}>`,
      to: email,
      subject: "Your New Password Is",
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
