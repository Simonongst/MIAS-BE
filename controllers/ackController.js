const jwt = require('jsonwebtoken');
const Asset = require('../models/asset');

const acceptAck = async (req, res) => {
  try {
    const { action } = req.params;
    const { id, token } = req.query;

    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    if (decoded.serialNumber !== id)
      return res.status(403).send('Invalid token');

    // Find the asset to check current status
    const asset = await Asset.findOne({ serialNumber: id });
    console.log('Current acknowledgement status:', asset?.acknowledgement);

    if (!asset) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Error</title>
          </head>
          <body style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; background: #f9f9f9;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h1 style="color: #dc3545;">Asset Not Found</h1>
              <p>The asset you're trying to acknowledge doesn't exist. Please contact IT Support.</p>
            </div>
          </body>
        </html>
      `);
    }

    const requestedStatus = action === 'accept' ? 'Accepted' : 'Rejected';

    // Check if already acknowledged (not Pending)
    if (['Accepted', 'Rejected'].includes(asset.acknowledgement)) {
      if (asset.acknowledgement === requestedStatus) {
        // Already performed the same action
        return res.send(`
          <!DOCTYPE html>
          <html>
            <head><title>Already Acknowledged</title></head>
            <body style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; background: #f9f9f9;">
              <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h1 style="color: #ffc107;">Already ${action === 'accept' ? 'Accepted' : 'Rejected'}</h1>
                <p>This asset has already been ${
                  action === 'accept' ? 'accepted' : 'rejected'
                }.</p>
              </div>
            </body>
          </html>
        `);
      } else {
        // Trying to do opposite action
        return res.send(`
          <!DOCTYPE html>
          <html>
            <head><title>Action Not Allowed</title></head>
            <body style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; background: #f9f9f9;">
              <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h1 style="color: #dc3545;">Cannot ${action === 'accept' ? 'Accept' : 'Reject'}</h1>
                <p>This asset has already been ${
                  asset.acknowledgement === 'Accepted' ? 'accepted' : 'rejected'
                }. You cannot change the acknowledgement status. Please approach the IT Support for any changes.</p>
              </div>
            </body>
          </html>
        `);
      }
    }

    // Update from Pending/Emailed to Accepted or Rejected
    const result = await Asset.findOneAndUpdate(
      { serialNumber: id },
      { acknowledgement: requestedStatus },
      { new: true }
    );

    res.redirect(
      `${process.env.BASE_URL}/acknowledgement/acknowledgement-status?success=${action}`
    );
  } catch (err) {
    console.error('Error in acceptAck:', err);
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
          success === 'accept' ? 'Accepted' : 'Rejected'
        } Successfully!</h1>
        <p>You can close this window now.</p>
      </body>
    </html>
    `);
};

module.exports = { acceptAck, ackResponse };
