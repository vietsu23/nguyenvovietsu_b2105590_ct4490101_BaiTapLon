<template>
  <div>
    <AppHeader />
    <div class="container mt-4">
      <h2>Mượn Sách</h2>
      <form @submit.prevent="borrowBook">
        <div class="form-group">
          <label for="borrowDate">Ngày Nhận:</label>
          <input type="date" v-model="borrowDate" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="returnDate">Ngày Trả:</label>
          <input type="date" v-model="returnDate" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">Mượn Sách</button>
      </form>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      borrowDate: '',
      returnDate: '',
      bookId: this.$route.params.id,
    };
  },
  methods: {
    async borrowBook() {
  try {
    const payload = {
      MaDocGia: this.$store.getters.currentUserId, 
      MaSach: this.bookId,
      NgayMuon: this.borrowDate,
      NgayTra: this.returnDate,
    };

    
    await axios.post('http://localhost:3000/api/theodoi', payload); 
    alert('Mượn sách thành công!');
    this.$router.push('/sachs'); 
  } catch (error) {
    console.error('Lỗi khi mượn sách:', error);
    alert('Có lỗi xảy ra, vui lòng thử lại.');
  }
}
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
