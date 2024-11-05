const express = require('express');
const router = express.Router();

const docgiaRouter = require('./docGia.router'); 
const sachRouter = require('./sach.router'); 
const nhaXuatBanRouter = require('./nhaXuatBan.router'); 
const theoDoiMuonSachRouter = require('./theoDoiMuonSach.router'); 
const nhanVienRouter = require('./nhanVien.router'); 
const thongBaoRouter = require('./thongBao.router');

router.use('/docgia', docgiaRouter);
router.use('/sach', sachRouter);
router.use('/nxb', nhaXuatBanRouter);
router.use('/theodoi', theoDoiMuonSachRouter);
router.use('/nhanvien', nhanVienRouter);
router.use('/thongbao',thongBaoRouter);
module.exports = router;
