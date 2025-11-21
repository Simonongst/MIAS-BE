const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const ReceiveAsset = require('../mailTemplates/ReceiveAsset');
const Asset = require('../models/asset.js');

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

    const assetToUpdate = await Asset.findOne({
      serialNumber: data.serialNumber,
    });

    if (!assetToUpdate) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
      assetToUpdate._id,
      { acknowledgement: "Emailed" },
      { new: true }
    );

    let template;
    if (emailTemplate === 'ReceiveAsset') {
      if (emailTemplate === 'ReceiveAsset') template = ReceiveAsset;
    }

    if (!template)
      return res.status(400).json({ error: 'Unknown email template' });

    // Generate signed tokens for each action button
    const acceptToken = jwt.sign(
      {
        serialNumber: data.serialNumber,
        userId: data.userId,
        action: 'accept',
      },
      process.env.ACCESS_SECRET,
      { expiresIn: '1d' }
    );

    const rejectToken = jwt.sign(
      {
        serialNumber: data.serialNumber,
        userId: data.userId,
        action: 'reject',
      },
      process.env.ACCESS_SECRET,
      { expiresIn: '1d' }
    );

    const acceptUrl = `${process.env.BASE_URL}/acknowledgement/accept?id=${
      data.serialNumber
    }&token=${encodeURIComponent(acceptToken)}`;
    const rejectUrl = `${process.env.BASE_URL}/acknowledgement/reject?id=${
      data.serialNumber
    }&token=${encodeURIComponent(rejectToken)}`;

    const html = template.html({ ...data, acceptUrl, rejectUrl });

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
