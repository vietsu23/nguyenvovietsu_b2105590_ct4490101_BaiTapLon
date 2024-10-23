const express = require('express');
const router = express.Router();

// Import các router
const docgiaRouter = require('./docGia.router'); // Chú ý tên file phải đúng với tên file thực tế
const sachRouter = require('./sach.router'); // Chú ý tên file phải đúng với tên file thực tế
const nhaXuatBanRouter = require('./nhaXuatBan.router'); // Chú ý tên file phải đúng với tên file thực tế
const theoDoiMuonSachRouter = require('./theoDoiMuonSach.router'); // Chú ý tên file phải đúng với tên file thực tế
const nhanVienRouter = require('./nhanVien.router'); // Chú ý tên file phải đúng với tên file thực tế

// Đăng ký các route
router.use('/docgia', docgiaRouter);
router.use('/sach', sachRouter);
router.use('/nxb', nhaXuatBanRouter);
router.use('/theodoi', theoDoiMuonSachRouter);
router.use('/nhanvien', nhanVienRouter);

module.exports = router;
