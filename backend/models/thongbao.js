const mongoose = require('mongoose');

const thongBaoSchema = new mongoose.Schema({
  maDocGia: { type: mongoose.Schema.Types.ObjectId, ref: 'Docgia', required: true },
  maTheoDoiMuonSach: { type: mongoose.Schema.Types.ObjectId, ref: 'TheoDoiMuonSach' }, // Trường mới
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ThongBao', thongBaoSchema);
