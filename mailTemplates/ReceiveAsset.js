const subject = '[Action Required] Acknowledge Receipt of Assets';

const text = (data) => `
Asset Assigned:

Recipient: ${data.recipientName}
Asset: ${data.assetName}
Serial: ${data.serial}
Assigned By: ${data.assignedBy}
Assigned At: ${data.assignedAt}

Acknowledge here: ${data.ackUrl}
`;

const html = (data) => `
  <div style="font-family: Arial; padding: 20px; line-height: 1.6;">
    <h2>Asset Assignment Acknowledgement</h2>
    <p>Hello ${data.recipientName},</p>
    <p>You have been assigned the following asset by the IT Support Department:</p>

    <table style="margin-top: 10px;">
      <tr><td><strong>Asset:</strong></td><td>${data.assetName}</td></tr>
      <tr><td><strong>Serial:</strong></td><td>${data.serial}</td></tr>
      <tr><td><strong>Assigned By:</strong></td><td>${data.assignedBy}</td></tr>
      <tr><td><strong>Assigned At:</strong></td><td>${data.assignedAt}</td></tr>
    </table>

    <p style="margin-top: 20px;">Please acknowledge receipt by clicking below:</p>

    <a href="${data.ackUrl}"
       style="display:inline-block; padding:10px 16px; background:#ff3a3a; color:white;
              text-decoration:none; border-radius:6px;">
      Acknowledge Asset
    </a>

    <p style="margin-top: 30px;">Thank you.</p>
  </div>
`;

module.exports = { subject, text, html };
