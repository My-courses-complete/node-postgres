"use strict";
const nodemailer = require("nodemailer");
const { config } = require("./config/config");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    port: 587,
    auth: {
        user: config.email.host,
        pass: config.email.password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.email.host, // sender address
    to: config.email.host, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail().catch(console.error);