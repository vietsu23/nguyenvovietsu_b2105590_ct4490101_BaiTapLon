<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <h2>Danh Sách Các Quyển Sách</h2>
      <ul v-if="sachs.length" class="list-group">
        <li v-for="sach in sachs" :key="sach._id" class="list-group-item">
          <strong>{{ sach.TenSach }}</strong> - Tác giả: {{ sach.TacGia }} <br />
          Giá: {{ sach.DonGia }} VNĐ | Năm xuất bản: {{ sach.NamXuatBan }}
        </li>
      </ul>
      <p v-else>Không có sách nào trong cơ sở dữ liệu.</p>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import axios from 'axios';

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      sachs: [],  // Mảng chứa danh sách sách từ API
    };
  },
  created() {
    this.fetchSachs();  // Gọi API khi component được tạo
  },
  methods: {
    async fetchSachs() {
      try {
        const response = await axios.get('http://localhost:3000/api/sach');  // Đường dẫn API backend
        this.sachs = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sách:', error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.list-group-item {
  border: 1px solid #ddd;
  margin-bottom: 8px;
  padding: 10px;
}
</style>
