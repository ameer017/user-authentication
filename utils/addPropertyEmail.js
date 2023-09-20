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

const addPropertyEmail = async (
    _id, name, location, price, rooms, description, bathroom, car_park, email
  ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const emailContent = `
        <h1>Hello from Homyz Realtor</h1>
        <p>We are pleased to inform you that your property with the following details has been added successfully:</p>
        <p>Name: ${name}</p>
        <p>Location: ${location}</p>
        <p>Price: ${price}</p>
        <p>Number of rooms: ${rooms}</p>
        <p>Description: ${description}</p>
        <p>Number of bathroom: ${bathroom}</p>
        <p>Number of car parks: ${car_park}</p>
      `;

      console.log(emailContent)

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Your property ${name} was added successfully!`,
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

module.exports = addPropertyEmail;
