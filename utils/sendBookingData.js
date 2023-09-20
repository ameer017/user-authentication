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

const sendBookingData = async (
    _id, name, email, phone
  ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailContent = `
        <h1>Hello from Homyz Realtor</h1>
        <p>We are pleased to inform you that your booking order has been received</p>
      `;

      console.log(emailContent)

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `A Booking Order was created`,
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

module.exports = sendBookingData;
