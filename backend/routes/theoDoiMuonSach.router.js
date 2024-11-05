const express = require('express');
const router = express.Router();
const theoDoiMuonSachController = require('../controllers/theoDoiMuonSachController');

router.post('/', theoDoiMuonSachController.createTheoDoiMuonSach);

router.get('/', theoDoiMuonSachController.getAllTheoDoiMuonSach);

router.get('/:id', theoDoiMuonSachController.getTheoDoiMuonSachById);

router.put('/:id', theoDoiMuonSachController.updateTheoDoiMuonSach);

router.delete('/:id', theoDoiMuonSachController.deleteTheoDoiMuonSach);

router.get('/docgia/:maDocGia', theoDoiMuonSachController.getPhieuMuonByDocGia);

module.exports = router;
