const mongoose = require('mongoose');

const docgiaSchema = new mongoose.Schema({
  HoLot: { type: String, required: true },
  Ten: { type: String, required: true },
  NgaySinh: { type: Date, required: true },
  Phai: { type: String, required: true },
  DiaChi: { type: String, required: true },
  DienThoai: { type: String, required: true },
  Email: { type: String, required: true, unique: true }, // Thêm trường email
  Password: { type: String, required: true }             // Thêm trường password
});

module.exports = mongoose.model('Docgia', docgiaSchema);
