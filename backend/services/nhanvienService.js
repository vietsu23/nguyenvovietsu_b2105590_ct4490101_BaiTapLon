const NhanVien = require('../models/nhanvien');
const bcrypt = require('bcryptjs');

exports.loginNhanVien = async (soDienThoai, password) => {
  try {
    // Tìm nhân viên theo số điện thoại
    const nhanVien = await NhanVien.findOne({ SoDienThoai: soDienThoai });
    if (!nhanVien) {
      throw new Error('Nhân viên không tồn tại');
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, nhanVien.Password);
    if (!isMatch) {
      throw new Error('Mật khẩu không chính xác');
    }

    return {
      username: nhanVien.HoTenNV,
      nhanVien: {
        _id: nhanVien._id, // Trả về ID nếu cần
        HoTenNV: nhanVien.HoTenNV,
      },
    };
  } catch (error) {
    throw new Error(`Lỗi khi đăng nhập nhân viên: ${error.message}`);
  }
};
// Tạo mới một nhân viên
exports.createNhanVien = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.Password, salt); // 10 là số vòng băm
    const newNhanVien = new NhanVien({
      ...data, // Sao chép các trường khác
      Password: hashedPassword, // Thay thế mật khẩu bằng mật khẩu đã băm
    });

    return await newNhanVien.save();
  } catch (error) {
    throw new Error(`Lỗi khi tạo nhân viên: ${error.message}`);
  }
};


// Lấy danh sách tất cả nhân viên
exports.getAllNhanVien = async () => {
  try {
    return await NhanVien.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách nhân viên: ${error.message}`);
  }
};

// Lấy thông tin nhân viên theo ID (MongoDB _id)
exports.getNhanVienById = async (id) => {
  try {
    return await NhanVien.findById(id); // Sử dụng findById để tìm theo _id
  } catch (error) {
    throw new Error(`Lỗi khi lấy nhân viên: ${error.message}`);
  }
};

// Cập nhật thông tin nhân viên theo ID (MongoDB _id)
exports.updateNhanVien = async (id, data) => {
  try {
    return await NhanVien.findByIdAndUpdate(id, data, { new: true }); // Sử dụng findByIdAndUpdate
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật nhân viên: ${error.message}`);
  }
};

// Xóa nhân viên theo ID (MongoDB _id)
exports.deleteNhanVien = async (id) => {
  try {
    return await NhanVien.findByIdAndDelete(id); // Sử dụng findByIdAndDelete
  } catch (error) {
    throw new Error(`Lỗi khi xóa nhân viên: ${error.message}`);
  }
};
