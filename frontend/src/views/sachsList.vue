<template>
  <div>
    <div class="container mt-4">
      <h2>Danh Sách Các Quyển Sách</h2>

      <!-- Thêm InputSearch -->
      <InputSearch v-model="searchQuery" @submit="searchBooks" />

      <router-link v-if="isLoggedIn && isManager" to="/sach/themsach" class="btn btn-success mb-3">Thêm Sách</router-link>
      
      <ul v-if="filteredSachs.length" class="list-group">
        <li v-for="sach in filteredSachs" :key="sach._id" class="list-group-item d-flex align-items-center">
          <div class="cover-image">
            <img v-if="sach.coverImagePath" :src="`http://localhost:3000/${sach.coverImagePath}`" alt="Cover Image" />
          </div>
          <div class="book-info">
            <strong>{{ sach.TenSach }}</strong> - Tác giả: {{ sach.TacGia }} <br />
            Giá: {{ sach.DonGia }} VNĐ | Năm xuất bản: {{ sach.NamXuatBan }} <br/>
            Số lượng: {{ sach.SoQuyen }}
            <div class="buttons mt-2">
              <button v-if="isLoggedIn && isReader" @click="borrowBook(sach._id)" class="btn btn-primary">Mượn</button>
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
import InputSearch from "@/components/InputSearch.vue";

export default {
  components: {
    AppHeader,
    InputSearch, 
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
      searchQuery: "", 
      isReader: false,  
      isManager: false, 
    };
  },
  computed: {
    
    filteredSachs() {
      return this.sachs.filter(sach => 
        sach.TenSach.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        sach.TacGia.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  created() {
    this.fetchSachs();  
    this.checkUserRole();
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
    },
    searchBooks() {
      
      console.log("Tìm kiếm sách với từ khóa:", this.searchQuery);
    },
    async borrowBook(id) {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Bạn cần đăng nhập để mượn sách.');
        this.$router.push('/login');
        return;
      }
      this.$router.push({ name: 'muon', params: { bookId: id } });
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
