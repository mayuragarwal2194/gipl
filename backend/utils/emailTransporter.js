const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.CLIENT_EMAIL_QUOTES,
    pass: process.env.CLIENT_EMAIL_PASSWORD_QUOTES,
  },
});

module.exports = transporter;