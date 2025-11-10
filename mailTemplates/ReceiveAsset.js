const subject = (data) => {
  return `[Action Required] IT Asset Transaction Acknowledgement - ${data.recipientName} (EID: ${data.eid})`;
};

const text = (data) => `
Recipient: ${data.recipientName}
Asset Name: ${data.assetName}
Serial No.: ${data.serial}
Assigned By: ${data.assignedBy}
Assigned At: ${data.assignedAt}
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

    <p style="margin-top: 20px;">Please acknowledge receipt in the portal:</p>

    <a href="${data.ackUrl}"
       style="display:inline-block; padding:10px 16px; background:#ff3a3a; color:white;
              text-decoration:none; border-radius:6px;">
      Acknowledge Asset in MIAS
    </a>

    <p style="margin-top: 30px;">Thank you.</p>
    <p style="margin-top: 15px;">If you are not the intended recipient, please notify the sender and delete this message.</p>
  </div>
`;

module.exports = { subject, text, html };
