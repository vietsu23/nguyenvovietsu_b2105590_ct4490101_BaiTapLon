const mongoose = require('mongoose');

const nxbSchema = new mongoose.Schema({
  TenNXB: { type: String, required: true },
  DiaChi: { type: String, required: true },
  DienThoai: { type: String }
});

module.exports = mongoose.model('NhaXuatBan', nxbSchema);
