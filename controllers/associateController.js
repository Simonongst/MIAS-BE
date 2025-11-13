const Associate = require('../models/associates.js');

const getAllAssociates = async (req, res) => {
  try {
    const associates = await Associate.find({});

    res.status(200).json(associates);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createAssociate = async (req, res) => {
  try {
    const newAssociate = new Associate(req.body);
    const savedAssociate = await newAssociate.save();

    res.status(201).json(savedAssociate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateAssociate = async (req, res) => {
  try {
    const updatedAssociate = await Associate.findByIdAndUpdate(
      req.params.associateId,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedAssociate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteAssociate = async (req, res) => {
  try {
    const deletedAssociate = await Associate.findByIdAndDelete(req.params.associateId);

    res.status(200).json(deletedAssociate);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { getAllAssociates, createAssociate, deleteAssociate, updateAssociate };
