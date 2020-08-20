require('dotenv').config()
const nodemailer = require('nodemailer');

module.exports = function(destination_email, subject, text){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'runawayengineering@gmail.com',
      pass: "Practicum20!"//process.env.EMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: 'runawayengineering@gmail.com',
    to: destination_email,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
