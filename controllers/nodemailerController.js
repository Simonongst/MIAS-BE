const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
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

    // Generate signed tokens for each action button
    const approveToken = jwt.sign(
      { serialNumber: data.serialNumber, userId: data.userId, action: 'approve' },
      process.env.ACCESS_SECRET,
      { expiresIn: '1d' }
    )

    const rejectToken = jwt.sign(
      { serialNumber: data.serialNumber, userId: data.userId, action: 'reject' },
      process.env.ACCESS_SECRET,
      { expiresIn: '1d' }
    )

    const approveUrl = `${process.env.BASE_URL}/acknowledgement/approve?id=${data.serialNumber}&token=${encodeURIComponent(approveToken)}`;
    const rejectUrl = `${process.env.BASE_URL}/acknowledgement/reject?id=${data.serialNumber}&token=${encodeURIComponent(rejectToken)}`;

    const html = template.html({ ...data, approveUrl, rejectUrl });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: recipient,
      subject: template.subject(data),
      text: template.text(data),
      html,
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
