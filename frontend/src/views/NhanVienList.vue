<template>
  <div class="container mt-4">
    <h2 class="mb-4">Danh Sách Nhân Viên</h2>
    <router-link :to="{name:'addnhanvien'}" class="btn btn-success mb-3">Thêm Nhân Viên</router-link>
    <table class="table table-striped table-bordered">
      <thead class="table-light">
        <tr>
          <th>Họ Tên</th>
          <th>Chức Vụ</th>
          <th>Địa Chỉ</th>
          <th>Số Điện Thoại</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="nhanVien in nhanViens" :key="nhanVien._id">
          <td>{{ nhanVien.HoTenNV }}</td>
          <td>{{ nhanVien.ChucVu }}</td>
          <td>{{ nhanVien.DiaChi }}</td>
          <td>{{ nhanVien.SoDienThoai }}</td>
          <td>
            <router-link :to="`/nguoi/${nhanVien._id}`" class="btn btn-warning btn-sm me-2">Sửa</router-link>
            <button @click="deleteNhanVien(nhanVien._id)" class="btn btn-danger btn-sm">Xóa</button>
            <button 
              v-if="!nhanVien.__v" 
              @click="updatePermission(nhanVien._id, 1)" 
              class="btn btn-success btn-sm me-2">
              Cấp quyền
            </button>
            <button 
              v-if="nhanVien.__v" 
              @click="updatePermission(nhanVien._id, 0)" 
              class="btn btn-secondary btn-sm">
              Thu hồi quyền
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "NhanVienList",
  data() {
    return {
      nhanViens: [],
    };
  },
  methods: {
    async fetchNhanViens() {
      try {
        const response = await axios.get('/api/nhanvien'); 
        this.nhanViens = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách nhân viên:', error);
      }
    },
    async deleteNhanVien(id) {
      if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
        try {
          await axios.delete(`/api/nhanvien/${id}`); 
          this.fetchNhanViens(); 
        } catch (error) {
          console.error('Lỗi khi xóa nhân viên:', error);
        }
      }
    },
    async updatePermission(id, permission) {
    try {
      await axios.patch(`/api/nhanvien/${id}`, { __v: permission });
      this.fetchNhanViens(); // Cập nhật lại danh sách
      alert(permission === 1 ? 'Cấp quyền thành công!' : 'Thu hồi quyền thành công!');
    } catch (error) {
      console.error('Lỗi khi cập nhật quyền:', error);
      alert('Cập nhật quyền thất bại!');
    }
  },
  },
  created() {
    this.fetchNhanViens(); 
  }
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
