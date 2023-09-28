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

const sendBookingConfirmationEmail = async (
   propertyEmail, name
  ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailContent = `
        <h1>Hello from Homyz Realtor</h1>
        <p>Your property ${name} has been booked</p>
        `;

      console.log(emailContent)

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: propertyEmail,
        subject: `Congratulations!!! your property just got booked`,
        html: emailContent,
      };

      await transporter.sendMail(mailOptions);

      console.log("Booking creation Email sent");
      
      resolve();
    } catch (error) {
      console.error("Error sending email:", error);
      reject(error);
    }
  });
};

module.exports = sendBookingConfirmationEmail;
