const express = require('express');
const router = express.Router();
const nxbController = require('../controllers/nhaXuatBanController');

router.post('/', nxbController.createNXB);

router.get('/', nxbController.getAllNXB);

router.get('/:id', nxbController.getNXBById);

router.put('/:id', nxbController.updateNXB);

router.delete('/:id', nxbController.deleteNXB);

module.exports = router;
