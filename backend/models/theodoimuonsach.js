const mongoose = require('mongoose');

const theoDoiMuonSachSchema = new mongoose.Schema({
  MaDocGia: { type: mongoose.Schema.Types.ObjectId, ref: 'Docgia', required: true }, 
  MaSach: { type: mongoose.Schema.Types.ObjectId, ref: 'Sach', required: true },
  NgayMuon: { type: Date, required: true }, 
  NgayTra: { type: Date, required: true },
  SoLuong: { type: Number, required: true }  
});

module.exports = mongoose.model('TheoDoiMuonSach', theoDoiMuonSachSchema);
