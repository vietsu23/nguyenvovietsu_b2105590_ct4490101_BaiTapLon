const TheoDoiMuonSach = require('../models/theodoimuonsach');

exports.createTheoDoiMuonSach = async (data) => {
  try {
    const newTheoDoiMuonSach = new TheoDoiMuonSach(data);
    return await newTheoDoiMuonSach.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo bản ghi theo dõi mượn sách: ${error.message}`);
  }
};

exports.updateTheoDoiMuonSach = async (id, data) => {
  try {
    return await TheoDoiMuonSach.findByIdAndUpdate(id, data, { new: true })
      .populate('MaDocGia')
      .populate('MaSach');
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật thông tin theo dõi mượn sách: ${error.message}`);
  }
};

exports.getAllTheoDoiMuonSach = async () => {
  try {
    return await TheoDoiMuonSach.find().populate('MaDocGia').populate('MaSach'); 
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách theo dõi mượn sách: ${error.message}`);
  }
};

exports.getTheoDoiMuonSachById = async (id) => {
  try {
    return await TheoDoiMuonSach.findById(id).populate('MaDocGia').populate('MaSach');
  } catch (error) {
    throw new Error(`Lỗi khi lấy thông tin theo dõi mượn sách: ${error.message}`);
  }
};

exports.deleteTheoDoiMuonSach = async (id) => {
  try {
    return await TheoDoiMuonSach.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(`Lỗi khi xóa bản ghi theo dõi mượn sách: ${error.message}`);
  }
};

exports.countByDocGia = async (maDocGia) => {
  return await TheoDoiMuonSach.countDocuments({ MaDocGia: maDocGia });
};

exports.getPhieuMuonByDocGia = async (maDocGia) => {
  try {
    
    const phieuMuons = await TheoDoiMuonSach.find({ MaDocGia: maDocGia })
      .populate('MaSach', 'TenSach') 
      .exec();
    return phieuMuons;
  } catch (error) {
    throw new Error('Lỗi khi lấy danh sách phiếu mượn');
  }
};

