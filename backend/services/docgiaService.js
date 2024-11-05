const DocGia = require('../models/docgia');
const bcrypt = require('bcryptjs'); 

exports.registerDocGia = async (data) => {
  try {
    
    const existingDocGia = await DocGia.findOne({ Email: data.Email });
    if (existingDocGia) {
      throw new Error('Email đã được sử dụng');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.Password, salt);
    
    const newDocGia = new DocGia({
      ...data,
      Password: hashedPassword,
    });
    return await newDocGia.save();
  } catch (error) {
    throw new Error(`Lỗi khi đăng ký đọc giả: ${error.message}`);
  }
};

exports.loginDocGia = async (email, password) => {
  try {
    
    const docGia = await DocGia.findOne({ Email: email });
    if (!docGia) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    
    const isMatch = await bcrypt.compare(password, docGia.Password);
    if (!isMatch) {
      throw new Error('Email hoặc mật khẩu không chính xác');
    }

    return docGia;
  } catch (error) {
    throw new Error(`Lỗi khi đăng nhập đọc giả: ${error.message}`);
  }
};

exports.getAllDocGia = async () => {
  try {
    return await DocGia.find();
  } catch (error) {
    throw new Error(`Lỗi khi lấy danh sách đọc giả: ${error.message}`);
  }
};

exports.getDocGiaById = async (id) => {
  try {
    return await DocGia.findById(id); 
  } catch (error) {
    throw new Error(`Lỗi khi lấy đọc giả: ${error.message}`);
  }
};

exports.updateDocGia = async (id, data) => {
  const { currentPassword, newPassword, ...updateData } = data;
  
  const docgia = await DocGia.findById(id);
  if (!docgia) throw new Error("Đọc giả không tồn tại");
    
  const isMatch = await bcrypt.compare(currentPassword, docgia.Password);
  if (!isMatch) throw new Error("Mật khẩu cũ không chính xác");

  Object.assign(docgia, updateData);
    
  if (newPassword) {
    docgia.Password = await bcrypt.hash(newPassword, 10);
  }

  await docgia.save();
  return docgia;
};

exports.deleteDocGia = async (id) => {
  try {
    return await DocGia.findByIdAndDelete(id); 
  } catch (error) {
    throw new Error(`Lỗi khi xóa đọc giả: ${error.message}`);
  }
};
