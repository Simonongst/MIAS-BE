const subject = (data) => {
  return `[Action Required] IT Asset Transaction Acknowledgement - ${data.recipientName} (EID: ${data.eid})`;
};

const text = (data) => `
Hello, you have been assigned an Asset.

Recipient: ${data.recipientName}
Asset Name: ${data.assetName}
Serial No.: ${data.serialNumber}
Assigned By: ${data.assignedBy}
Assigned At: ${data.assignedAt}

To Approve, click here: ${data.approveUrl}
To Reject, click here: ${data.rejectUrl}
`;

const html = (data) => `
  <div style="font-family: Arial; padding: 20px; line-height: 1.6;">
    <h2>Asset Assignment Acknowledgement</h2>
    <p>Hello ${data.recipientName},</p>
    <p>You have been assigned the following asset by the IT Support Department:</p>

    <table style="margin-top: 10px;">
      <tr><td><strong>Asset Name:</strong></td><td>${data.assetName}</td></tr>
      <tr><td><strong>Serial Number:</strong></td><td>${data.serialNumber}</td></tr>
      <tr><td><strong>Assigned By:</strong></td><td>${data.assignedBy}</td></tr>
      <tr><td><strong>Assigned At:</strong></td><td>${data.assignedAt}</td></tr>
    </table>

    <p>Click below to confirm receipt:</p>
    <p>
      <a href="${data.approveUrl}" style="background:#28a745;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;">Approve</a>
      <a href="${data.rejectUrl}" style="background:#dc3545;color:white;padding:10px 15px;border-radius:5px;text-decoration:none;margin-left:10px;">Reject</a>
    </p>
    <p>These links will expire in 24 hours for security reasons.</p>
    <p style="margin-top: 15px;">Thank you.</p>
    <p style="margin-top: 15px;">If you are not the intended recipient, please notify the sender and delete this message.</p>
  </div>
`;

module.exports = { subject, text, html };
