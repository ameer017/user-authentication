const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const propertyBooked = async (
    _id, name, location, email
  ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailContent = `
        <h1>Hello from Homyz Realtor</h1>
        <p>We are pleased to inform you that your property ${name} has been booked</p>
      `;

      console.log(emailContent)

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Your property ${name} at ${location} has been booked!`,
        html: emailContent,
      };

      await transporter.sendMail(mailOptions);

      console.log("Add property Email sent");
      
      resolve();
    } catch (error) {
      console.error("Error sending email:", error);
      reject(error);
    }
  });
};

module.exports = propertyBooked;
