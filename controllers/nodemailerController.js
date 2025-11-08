const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: 'syeongsn@gmail.com',
      subject: 'Hello ✔',
      text: 'Hello world?',
      html: '<b>Hello world?</b>',
    });

    console.log('Message sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

    res.status(200).json({
      message: 'Email sent',
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (error) {
    console.error('Unable to send email', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = { sendEmail };
