const sachService = require('../services/sachService');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

exports.getAllSach = async (req, res) => {
  try {
    const sachs = await sachService.getAllSach();
    res.json(sachs);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách sách', error: error.message });
  }
};

exports.getSachById = async (req, res) => {
  try {
    const sach = await sachService.getSachById(req.params.id);
    if (!sach) {
      return res.status(404).json({ message: 'Không tìm thấy sách' });
    }
    res.json(sach);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin sách', error: error.message });
  }
};

exports.createSach = [
  upload.single('coverImage'),
  async (req, res) => {
    try {
      const data = req.body;
      if (req.file) {
        data.coverImagePath = req.file.path;
      }
      const newSach = await sachService.createSach(data);
      res.status(201).json(newSach);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tạo sách', error: error.message });
    }
  },
];

exports.updateSach = [
  upload.single('coverImage'),
  async (req, res) => {
    try {
      const data = req.body;
      if (req.file) {
        data.coverImagePath = req.file.path;
      }
      const updatedSach = await sachService.updateSach(req.params.id, data);
      if (!updatedSach) {
        return res.status(404).json({ message: 'Không tìm thấy sách' });
      }
      res.json(updatedSach);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi cập nhật thông tin sách', error: error.message });
    }
  },
];

exports.deleteSach = async (req, res) => {
  try {
    const deletedSach = await sachService.deleteSach(req.params.id);
    if (!deletedSach) {
      return res.status(404).json({ message: 'Không tìm thấy sách để xóa' });
    }
    res.json({ message: 'Sách đã được xóa thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa sách', error: error.message });
  }
};
