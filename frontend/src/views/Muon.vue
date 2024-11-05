<template>
  <div class="muon">
    <h4 class="text-center">Đăng Kí Mượn Sách</h4>

    <div v-if="readerName && bookTitle">
      <p><strong>Tên Người Mượn:</strong> {{ readerName }}</p>
      <p><strong>Email Liên Hệ:</strong> {{ Email }}</p>
      <p><strong>Tên Sách:</strong> {{ bookTitle }}</p>
    </div>

    <form @submit.prevent="handleBorrow">
      <div class="form-group">
        <label for="borrowDate">Ngày Mượn:</label>
        <input type="date" id="borrowDate" v-model="borrowDate" required />
      </div>

      <div class="form-group">
        <label for="returnDate">Ngày Trả:</label>
        <input type="date" id="returnDate" v-model="returnDate" required />
      </div>

      <div class="form-group">
        <label for="quantity">Số Lượng Sách:</label>
        <input type="number" id="quantity" v-model="quantity" min="1" :max="bookQuantity" required />
        <p><small>Số lượng còn lại: {{ bookQuantity }}</small></p>
      </div>

      <button type="submit" class="btn btn-primary">Mượn Sách</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Muon",
  data() {
    return {
      borrowDate: "",
      returnDate: "",
      quantity: 1,
      readerName: "",
      bookTitle: "",
      bookQuantity: 0,
    };
  },
  computed: {
    userId() {
      return localStorage.getItem('userId');
    }
  },
  async created() {
    await this.fetchReaderName();
    await this.fetchBookDetails();
  },
  methods: {
    async fetchReaderName() {
      try {
        const response = await axios.get(`http://localhost:3000/api/docgia/${this.userId}`);
        this.readerName = response.data.Ten; 
        this.Email =  response.data.Email;
      } catch (error) {
        console.error("Lỗi khi lấy tên đọc giả:", error.message);
      }
    },
    async fetchBookDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/api/sach/${this.$route.params.bookId}`);
        this.bookTitle = response.data.TenSach; 
        this.bookQuantity = response.data.SoQuyen; 
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết sách:", error.message);
      }
    },
    async handleBorrow() {
      try {
        if (!this.userId) {
          alert("Bạn cần đăng nhập để mượn sách.");
          this.$router.push("/login");
          return;
        }

        if (new Date(this.returnDate) <= new Date(this.borrowDate)) {
          alert("Ngày trả phải sau ngày mượn.");
          return;
        }

        if (this.quantity > this.bookQuantity) {
          alert("Số lượng sách không đủ.");
          return;
        }

        const payload = {
          MaDocGia: this.userId,
          MaSach: this.$route.params.bookId,
          NgayMuon: this.borrowDate,
          NgayTra: this.returnDate,
          SoLuong: this.quantity,
        };

        const response = await axios.post("http://localhost:3000/api/theodoi", payload);

        if (response.status === 201) {
          alert("Yêu cầu mượn sách thành công!");
          this.$router.push("/");
          
          await axios.put(`http://localhost:3000/api/sach/${this.$route.params.bookId}`, {
            SoQuyen: this.bookQuantity - this.quantity
          });
        } else {
          alert("Không thể lưu bản ghi. Vui lòng thử lại.");
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu mượn sách:", error.response?.data || error.message);
        alert("Có lỗi xảy ra khi mượn sách. Vui lòng thử lại.");
      }
    }
  }
};
</script>

<style scoped>
.borrow-book-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  font-weight: bold;
}
</style>
