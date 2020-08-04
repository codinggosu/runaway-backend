require('dotenv').config()

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'runawayengineering@gmail.com',
    pass: process.env.EMAIL_PASSWORD
  }
});

const mailOptions = {
  from: 'runawayengineering@gmail.com',
  to: 'destination@example.com',
  subject: 'Email from runaway',
  text: 'Test Email.'
};

transporter.sendMail(mailOptions, function(error, info){
  console.log(process.env.EMAIL_PASSWORD)
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

