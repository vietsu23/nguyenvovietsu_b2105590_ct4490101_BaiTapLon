<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4">Danh Sách Phiếu Mượn</h2>
    
    <!-- Icon chuông cho đọc giả -->
    <div v-if="isReader" class="notification-icon" @click="toggleNotificationModal"> 
      <i class="fa fa-bell"></i>
      <span v-if="unreadNotifications.length" class="notification-count">{{ unreadNotifications.length }}</span>
    </div>
    
    <!-- Modal hiển thị thông báo -->
    <div v-if="showNotificationModal" class="modal-backdrop">
      <div class="modal-content">
        <h4>Thông báo của bạn</h4>
        <ul>
          <li v-for="notification in unreadNotifications" :key="notification._id">
            {{ notification.message }}
          </li>
        </ul>
        <button class="btn btn-primary" @click="markNotificationsAsRead">Đánh dấu là đã đọc</button>
        <button class="btn btn-secondary" @click="toggleNotificationModal">Đóng</button>
      </div>
    </div>

    <!-- Bảng phiếu mượn -->
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Tên Đọc Giả</th>
          <th scope="col">Tên Sách</th>
          <th scope="col">Ngày Mượn</th>
          <th scope="col">Ngày Trả</th>
          <th scope="col">Số Lượng</th>
          <th scope="col">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="records.length === 0">
          <td colspan="6" class="text-center">Không Có Sách Nào Được Mượn</td>
        </tr>
        <tr v-for="record in filteredRecords" :key="record._id">
          <td>{{ record.MaDocGia ? record.MaDocGia.Ten : 'Không xác định' }}</td>
          <td>{{ record.MaSach ? record.MaSach.TenSach : 'Không xác định' }}</td>
          <td>{{ new Date(record.NgayMuon).toLocaleDateString() }}</td>
          <td>{{ new Date(record.NgayTra).toLocaleDateString() }}</td>
          <td>{{ record.SoLuong }}</td>
          <td>
            <button v-if="isReader" class="btn btn-danger" @click="returnBook(record._id, record.MaSach?._id, record.SoLuong)">
              Trả Sách
            </button>
            <button v-if="isManager" class="btn btn-danger" @click="deleteBook(record._id, record.MaSach?._id, record.SoLuong)">
              Xóa
            </button>
            <button v-if="isManager" class="btn btn-warning" @click="openReminderModal(record.MaDocGia?._id)">
              Thông báo
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal nhập thông báo -->
    <div v-if="showReminderModal" class="modal-backdrop">
      <div class="modal-content">
        <h4>Gửi thông báo</h4>
        <textarea v-model="notificationMessage" placeholder="Nhập nội dung thông báo" rows="4" class="form-control"></textarea>
        <button class="btn btn-primary" @click="sendReminder(currentDocGiaId)">Gửi Thông báo</button>
        <button class="btn btn-secondary" @click="toggleReminderModal">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      records: [],
      isReader: false,
      isManager: false,
      showNotificationModal: false,
      showReminderModal: false, 
      unreadNotifications: [],
      currentDocGiaId: null, 
      notificationMessage: '' 
    };
  },
  computed: {
    filteredRecords() {
      if (this.isManager) {
        return this.records;
      } else if (this.isReader) {
        const userId = localStorage.getItem('userId');
        return this.records.filter(record => record.MaDocGia && record.MaDocGia._id === userId);
      }
      return [];
    }
  },
  methods: {
    async fetchRecords() {
      try {
        const response = await axios.get('/api/theodoi');
        this.records = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sách đã mượn:', error);
      }
    },
    async returnBook(recordId, bookId, quantity) {
      try {
        const response = await axios.get(`/api/sach/${bookId}`);
        const bookQuantity = response.data.SoQuyen;
        await axios.delete(`/api/theodoi/${recordId}`);
        await axios.put(`/api/sach/${bookId}`, { SoQuyen: bookQuantity + quantity });
        this.fetchRecords();
        alert('Sách đã được trả thành công');
      } catch (error) {
        console.error('Lỗi khi trả sách:', error);
        alert('Không thể trả sách');
      }
    },
    async deleteBook(recordId, bookId, quantity) {
      try {
        const response = await axios.get(`/api/sach/${bookId}`);
        const bookQuantity = response.data.SoQuyen;
        await axios.delete(`/api/theodoi/${recordId}`);
        await axios.put(`/api/sach/${bookId}`, { SoQuyen: bookQuantity + quantity });
        this.fetchRecords();
        alert('Xóa Phiếu Mượn Thành Công');
      } catch (error) {
        console.error('Lỗi khi xóa:', error);
        alert('Không thể xóa');
      }
    },
    openReminderModal(maDocGia) {
      this.currentDocGiaId = maDocGia; 
      this.showReminderModal = true; 
    },
    toggleReminderModal() {
      this.showReminderModal = !this.showReminderModal; 
    },
    async sendReminder(maDocGia) {
      try {
        await axios.post('/api/thongbao', {
          maDocGia,
          message: this.notificationMessage 
        });
        alert('Thông báo đã được gửi đến đọc giả.');
        this.notificationMessage = ''; 
        this.toggleReminderModal(); 
      } catch (error) {
        console.error('Lỗi khi gửi thông báo:', error);
        alert('Không thể gửi thông báo');
      }
    },
    checkUserRole() {
      const userRole = localStorage.getItem('userRole');
      this.isReader = userRole === 'docgia';
      this.isManager = userRole === 'nhanvien';
    },
    async fetchUnreadNotifications() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/thongbao/chua-doc/${userId}`);
        this.unreadNotifications = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy thông báo:', error);
      }
    },
    toggleNotificationModal() {
      this.showNotificationModal = !this.showNotificationModal;
      
      if (this.showNotificationModal) {
        this.fetchUnreadNotifications(); 
      }
    },
    async markNotificationsAsRead() {
      try {
        const userId = localStorage.getItem('userId');
        
        const response = await axios.put(`/api/thongbao/danh-dau-da-doc/${userId}`);
        this.unreadNotifications = []; 
        this.showNotificationModal = false; 
        alert('Thông báo đã được đánh dấu là đã đọc.'); 
      } catch (error) {
        console.error('Lỗi khi đánh dấu thông báo là đã đọc:', error);
        alert('Không thể đánh dấu thông báo là đã đọc.'); 
      }
    }
  },
  mounted() {
    this.fetchRecords();
    this.checkUserRole();
    if (this.isReader) {
      this.fetchUnreadNotifications();
    }
  }
};
</script>

<style>
.container {
  max-width: 800px;
}

.notification-icon {
  position: absolute; /* Thay đổi từ relative thành absolute */
  top: 20px; /* Điều chỉnh khoảng cách từ trên cùng */
  right: 20px; /* Điều chỉnh khoảng cách từ bên phải */
  font-size: 24px;
  cursor: pointer;
}

.notification-count {
  position: absolute; /* Thay đổi từ relative thành absolute */
  top: -5px; /* Điều chỉnh vị trí để biểu thị số lượng thông báo */
  right: -10px; /* Điều chỉnh vị trí cho phù hợp */
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  max-width: 100%;
}

.modal-content h4 {
  margin-top: 0;
}
</style>
