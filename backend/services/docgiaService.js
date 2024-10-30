const DocGia = require('../models/docgia');
const bcrypt = require('bcryptjs'); // Thêm bcrypt để mã hóa mật khẩu

// Tạo mới một đọc giả (Đăng ký)
exports.registerDocGia = async (data) => {
  try {
    // Kiểm tra nếu email đã tồn tại
    const existingDocGia = await DocGia.findOne({ Email: data.Email });
    if (existingDocGia) {
      throw new Error('Email đã được sử dụng');
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.Password, salt);

    // Tạo mới đọc giả với mật khẩu mã hóa
    const newDocGia = new DocGia({
      ...data,
      Password: hashedPassword,
    });
    return await newDocGia.save();
  } catch (error) {
    throw new Error(`Lỗi khi đăng ký đọc giả: ${error.message}`);
  }
};


// Đăng nhập đọc giả
exports.loginDocGia = async (email, password) => {
  try {
    // Tìm đọc giả theo email
    const docGia = await DocGia.findOne({ Email: email });
    if (!docGia) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, docGia.Password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    return docGia;
  } catch (error) {
    throw new Error(`Lỗi khi đăng nhập đọc giả: ${error.message}`);
  }
};

// Lấy danh sách tất cả đọc giả
exports.getAllDocGia = async () => {
  try {
    return await DocGia.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách đọc giả: ${error.message}`);
  }
};

// Lấy thông tin đọc giả theo ID
exports.getDocGiaById = async (id) => {
  try {
    return await DocGia.findById(id); // Sử dụng findById để tìm theo _id
  } catch (error) {
    throw new Error(`Lỗi khi lấy đọc giả: ${error.message}`);
  }
};

// Cập nhật thông tin đọc giả theo ID
exports.updateDocGia = async (id, data) => {
  try {
    if (data.Password) {
      // Mã hóa mật khẩu mới (nếu có)
      const salt = await bcrypt.genSalt(10);
      data.Password = await bcrypt.hash(data.Password, salt);
    }
    return await DocGia.findByIdAndUpdate(id, data, { new: true }); // Sử dụng findByIdAndUpdate
  } catch (error) {
    throw new Error(`Lỗi khi cập nhật đọc giả: ${error.message}`);
  }
};

// Xóa đọc giả theo ID
exports.deleteDocGia = async (id) => {
  try {
    return await DocGia.findByIdAndDelete(id); // Sử dụng findByIdAndDelete
  } catch (error) {
    throw new Error(`Lỗi khi xóa đọc giả: ${error.message}`);
  }
};
