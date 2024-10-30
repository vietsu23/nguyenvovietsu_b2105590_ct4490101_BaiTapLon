<template>
  <div>
    <div class="container mt-4">
      <h2>Danh Sách Các Quyển Sách</h2>
       <router-link v-if="isLoggedIn && isManager" to="/sach/themsach" class="btn btn-success mb-3">Thêm Sách</router-link>
      <ul v-if="sachs.length" class="list-group">
        <li v-for="sach in sachs" :key="sach._id" class="list-group-item d-flex align-items-center">
          <div class="cover-image">
            <img v-if="sach.coverImagePath" :src="`http://localhost:3000/${sach.coverImagePath}`" alt="Cover Image" />
          </div>
          <div class="book-info">
            <strong>{{ sach.TenSach }}</strong> - Tác giả: {{ sach.TacGia }} <br />
            Giá: {{ sach.DonGia }} VNĐ | Năm xuất bản: {{ sach.NamXuatBan }} <br/>
            Số lượng: {{ sach.SoQuyen}}
            <div class="buttons mt-2">
              <button v-if="isLoggedIn && isReader" @click="borrowBook(sach._id)" class="btn btn-primary">Mượn</button>
              <!-- <button v-if="isLoggedIn && isManager" @click="editBook(sach._id)" class="btn btn-warning">Sửa</button> -->
              <router-link v-if="isLoggedIn && isManager" :to="`/sach/suasach/${sach._id}`" class="btn btn-warning">Sửa</router-link>
              <button v-if="isLoggedIn && isManager" @click="deleteBook(sach._id)" class="btn btn-danger">Xóa</button>
            </div>
          </div>
        </li>
      </ul>
      <p v-else>Không có sách nào trong cơ sở dữ liệu.</p>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import BookService from "@/services/book.service"; 

export default {
  components: {
    AppHeader,
  },
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      sachs: [],
      isReader: false,  
      isManager: false, 
    };
  },
  created() {
    this.fetchSachs();  
    this.checkUserRole(); // Kiểm tra vai trò người dùng
  },
  methods: {
    async fetchSachs() {
      try {
        this.sachs = await BookService.getAll(); 
      } catch (error) {
        console.error('Lỗi khi lấy danh sách sách:', error);
      }
    },
    checkUserRole() {
      const userRole = localStorage.getItem('userRole');
      this.isReader = userRole === 'docgia';
      this.isManager = userRole === 'nhanvien';
      console.log(this.isLoggedIn, this.isManager, this.isReader);
    },
    async borrowBook(id) {
      console.log(`Mượn sách với ID: ${id}`);
      // Thêm logic mượn sách tại đây
    },
    async deleteBook(id) {
      try {
        await BookService.delete(id); 
        this.fetchSachs(); 
      } catch (error) {
        console.error(`Lỗi khi xóa sách với ID ${id}:`, error);
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
  display: flex;
  align-items: center;
}

.cover-image {
  flex-shrink: 0;
  margin-right: 10px;
}

.cover-image img {
  max-width: 100px;
  height: auto;
}

.book-info {
  flex-grow: 1;
}

.buttons {
  margin-top: 10px;
}

img {
  max-width: 100%;
  height: auto;     
}
</style>
