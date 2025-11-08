const express = require("express");
const router = express.Router();
const associateController = require("../controllers/associateController");

const { getAllAssociates, createAssociate, deleteAssociate } = associateController;

router.get('/', getAllAssociates);
router.post('/', createAssociate);
router.delete('/:associateId', deleteAssociate);

module.exports = router;