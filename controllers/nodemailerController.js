const nodemailer = require('nodemailer');

let transporter;

(async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log('Ethereal test account ready:', testAccount.user);
  } catch (err) {
    console.error('Failed to create Ethereal account:', err);
  }
})();

// Real account
// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "maddison53@ethereal.email",
//     pass: "jn7jnAPss4f63QBp6D",
//   },
// });

const sendEmail = async (req, res) => {
  try {
    if (!transporter) throw new Error('Transporter not initialized yet');

    const info = await transporter.sendMail({
      from: '"Maddison Foo Koch" <test@ethereal.email>',
      to: 'bar@example.com, baz@example.com',
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
