const nodemailer = require('nodemailer');
const ReceiveAsset = require('../mailTemplates/ReceiveAsset');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (req, res) => {
  try {
    const { emailTemplate, recipient, data } = req.body;

    let template;
    if (emailTemplate === 'ReceiveAsset') {
      if (emailTemplate === 'ReceiveAsset') template = ReceiveAsset;
    }

    if (!template)
      return res.status(400).json({ error: 'Unknown email template' });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: recipient,
      subject: template.subject,
      text: template.text(data),
      html: template.html(data),
    });

    res.status(200).json({
      message: 'Email sent',
    });
  } catch (error) {
    console.error('Unable to send email', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = { sendEmail };
