const jwt = require('jsonwebtoken');
const Asset = require('../models/asset');

const approveAck = async (req, res) => {
  try {
    const { action } = req.params;
    const { id, token } = req.query;

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    if (decoded.serialNumber !== id)
      return res.status(403).send('Invalid token');

    // Check if asset exists
    const asset = await Asset.findOne({ serialNumber: id });

    if (!asset) {
      console.log('Asset not found with serialNumber:', id);
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Error</title></head>
          <body>
            <h1>Asset Not Found</h1>
            <p>The asset you're trying to acknowledge doesn't exist.</p>
          </body>
        </html>
      `);
    }

    // Check if user already acknowledged
    const requestedStatus = action === 'approve';

    if (asset.acknowledged !== null && asset.acknowledged !== undefined) {
      if (asset.acknowledged === requestedStatus) {
        return res.send(`
          <!DOCTYPE html>
          <html>
            <head><title>Already Acknowledged</title></head>
            <body>
              <h1>Already ${action === 'approve' ? 'Approved' : 'Rejected'}</h1>
              <p>This asset has already been ${action === 'approve' ? 'approved' : 'rejected'}.</p>
            </body>
          </html>
        `);
      } else {
        return res.send(`
          <!DOCTYPE html>
          <html>
            <head><title>Action Not Allowed</title></head>
            <body>
              <h1>Cannot ${action === 'approve' ? 'Approve' : 'Reject'}</h1>
              <p>This asset has already been ${asset.acknowledged ? 'approved' : 'rejected'}. You cannot change the acknowledgement status. For changes, please contact IT Support.</p>
            </body>
          </html>
        `);
      }
    }

    const result = await Asset.findOneAndUpdate(
      { serialNumber: id },
      { acknowledged: action === 'approve' },
      { new: true }
    );

    if (!result) {
      console.log('Asset not found with serialNumber:', id);
      return res.status(404).json({ err: 'Asset not found' });
    }

    res.redirect(
      `${process.env.BASE_URL}/acknowledgement/acknowledgement-status?success=${action}`
    );
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const ackResponse = (req, res) => {
  const { success } = req.query;
  res.send(`
    <!DOCTYPE html>
    <html>
      <head><title>Acknowledgement Status</title></head>
      <body>
        <h1>Acknowledgement ${
          success === 'approve' ? 'Approved' : 'Rejected'
        } Successfully!</h1>
        <p>You can close this window now.</p>
      </body>
    </html>
    `);
};

module.exports = { approveAck, ackResponse };
