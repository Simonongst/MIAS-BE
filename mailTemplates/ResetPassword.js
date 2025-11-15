const text = (resetUrl) => `
You are receiving this email because you had requested a password reset in the MIAS portal. If this wasn't you, please ignore this email and contact the IT Support Department.
Reset your password: ${resetUrl}
`;

const html = (resetUrl) => `
  <div style="font-family: Arial; padding: 20px; line-height: 1.6;">
    <p>Hello,</p>
    <p>You are receiving this email because you had requested a password reset in the MIAS portal. If this wasn't you, please ignore this email and contact the IT Support Department.</p>

    <p>This link will expire in 15 minutes for security reasons.</p>
    <p>
      <a href="${resetUrl}" style="background:#dc3545;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;">Reset your password</a>
    </p>
    <p style="margin-top: 15px;">Thank you.</p>
    <p style="margin-top: 15px;">If you are not the intended recipient, please notify the sender and delete this message.</p>
  </div>
`;

module.exports = { text, html };
