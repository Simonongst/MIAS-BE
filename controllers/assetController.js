const Asset = require('../models/asset.js');
const Associate = require('../models/associates');
const Invoice = require('../models/invoice');
const Transaction = require('../models/transaction.js');

const createAsset = async (req, res) => {
  try {
    console.log('Received req.body:', req.body); // Add this line
    const { owner, invoice, serialNumber, ...assetData } = req.body;
    console.log('serialNumber extracted:', serialNumber); // Add this line

    if (serialNumber) {
      const serialNumberExists = await Asset.findOne({ serialNumber });
      if (serialNumberExists) {
        return res.json({
          success: false,
          message: 'Serial Number already exists.',
        });
      }
    }

    let ownerId = null;

    if (owner) {
      const associate = await Associate.findById(owner);
      if (associate) {
        ownerId = associate._id;
      }
    }

    // Match invoice with invoice table
    let invoiceId = null;
    if (invoice) {
      const invoiceDoc = await Invoice.findById(invoice);
      if (invoiceDoc) {
        invoiceId = invoiceDoc._id;
      }
    }

    const newAsset = new Asset({
      ...assetData,
      serialNumber,
      owner: ownerId,
      invoice: invoiceId,
    });

    const savedAsset = await newAsset.save();

    console.log('newAsset', newAsset);
    console.log('savedAsset', savedAsset);

    const populatedAsset = await Asset.findById(savedAsset._id)
      .populate('invoice')
      .populate('owner', 'eid name email');

    await Transaction.create({
      action: 'CREATE',
      asset: {
        _id: savedAsset._id,
        assetName: savedAsset.assetName,
        serialNumber: savedAsset.serialNumber,
        category: savedAsset.category,
      },
      performedBy: {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Asset successfully created.',
      asset: populatedAsset,
    });
  } catch (err) {
    console.error('Asset creation error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find({})
      .populate('invoice')
      .populate('owner', 'eid name email');
    console.log('Populated assets:', JSON.stringify(assets[0], null, 2));

    res.status(200).json(assets);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.assetId)
      .populate('invoice')
      .populate('owner', 'eid name email');

    res.status(200).json(asset);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateAsset = async (req, res) => {
  try {
    const { owner, invoice, ...assetData } = req.body;

    const oldAsset = await Asset.findById(req.params.assetId)
      .populate('invoice')
      .populate('owner', 'eid name email');

    if (!oldAsset) {
      return res.status(404).json({ error: 'Asset not found' });
    }

    const updateData = { ...assetData };

    // Match owner with associate table by ID
    if (owner) {
      const associate = await Associate.findById(owner);
      if (associate) {
        updateData.owner = associate._id;
      } else {
        updateData.owner = null;
      }
    }

    // Match invoice with invoice table by ID
    if (invoice) {
      const invoiceDoc = await Invoice.findById(invoice);
      if (invoiceDoc) {
        updateData.invoice = invoiceDoc._id;
      } else {
        updateData.invoice = null;
      }
    }

    const changes = {};

    const getReadableValue = (key, value, asset) => {
      if (!value) return 'None';

      if (key === 'owner' && asset.owner) {
        return asset.owner.name || String(value);
      }
      if (key === 'invoice' && asset.invoice) {
        return asset.invoice.invoiceNumber || String(value);
      }
      return String(value);
    };

    // Compare and track changes with readable values
    for (const key in updateData) {
      const oldValue = String(oldAsset[key]?._id || oldAsset[key]);
      const newValue = String(updateData[key]?._id || updateData[key]); // Changed from updatedAsset to updateData
      
      if (oldValue !== newValue) {
        changes[key] = {
          from: getReadableValue(key, oldAsset[key], oldAsset),
          to: getReadableValue(key, updateData[key], oldAsset), // Changed from updatedAsset to updateData
        };
      }
    }
        
    if (Object.keys(changes).length === 0) {
      return res.status(200).json(oldAsset);
    }

    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.assetId,
      updateData,
      { new: true }
    )
      .populate('invoice')
      .populate('owner', 'eid name email');

    await Transaction.create({
      action: 'UPDATE',
      asset: {
        _id: updatedAsset._id,
        assetName: updatedAsset.assetName,
        serialNumber: updatedAsset.serialNumber,
        category: updatedAsset.category,
      },
      performedBy: {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
      },
      changes,
    });

    res.status(200).json(updatedAsset);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteAsset = async (req, res) => {
  try {
    const deletedAsset = await Asset.findByIdAndDelete(req.params.assetId);

    await Transaction.create({
      action: 'DELETE',
      asset: {
        _id: deletedAsset._id,
        assetName: deletedAsset.assetName,
        serialNumber: deletedAsset.serialNumber,
        category: deletedAsset.category,
      },
      performedBy: {
        _id: req.user._id,
        name: req.user.name,
        username: req.user.username,
      },
    });

    res.status(200).json(deletedAsset);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createComment = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const asset = await Asset.findById(req.params.assetId);
    asset.comments.push(req.body);
    await asset.save();

    const newComment = asset.comments[asset.comments.length - 1];

    newComment._doc.author = req.user;

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getAssetComments = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.assetId);
    if (!asset) {
      return res.status(404).send('Asset not found.');
    }

    res.status(200).json(asset.comments);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const updateAssetComment = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.assetId);
    if (!asset) {
      return res.status(404).send('Asset not found.');
    }

    const comment = asset.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).send('Comment not found.');
    }

    if (!['Admin', 'Editor'].includes(req.user.role)) {
      return res
        .status(403)
        .send('You do not have the permission to update comments');
    }

    comment.set(req.body);
    await asset.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const deleteAssetComment = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.assetId);
    if (!asset) {
      return res.status(404).send('Asset not found.');
    }

    const comment = asset.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).send('Comment not found.');
    }

    if (!['Admin', 'Editor'].includes(req.user.role)) {
      return res
        .status(403)
        .send('You do not have the permission to delete comments.');
    }

    comment.deleteOne();
    await asset.save();

    res.status(200).json({ message: 'Comment deleted successfully.' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  createAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
  createComment,
  getAssetComments,
  updateAssetComment,
  deleteAssetComment,
};
