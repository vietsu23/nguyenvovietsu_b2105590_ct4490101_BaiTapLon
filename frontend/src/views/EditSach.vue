<template>
  <div class="editsach container mt-5">
    <h2 class="mb-4">Chỉnh sửa Sách</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="TenSach" class="form-label">Tên Sách</label>
        <input type="text" id="TenSach" v-model="sach.TenSach" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="DonGia" class="form-label">Đơn Giá</label>
        <input type="number" id="DonGia" v-model="sach.DonGia" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="SoQuyen" class="form-label">Số Quyển</label>
        <input type="number" id="SoQuyen" v-model="sach.SoQuyen" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="NamXuatBan" class="form-label">Năm Xuất Bản</label>
        <input type="number" id="NamXuatBan" v-model="sach.NamXuatBan" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="MaNXB" class="form-label">Nhà Xuất Bản</label>
        <select v-model="sach.NhaXuatBan" class="form-select" required>
          <option v-for="nxb in nhaXuatBanOptions" :key="nxb._id" :value="nxb._id">
            {{ nxb.TenNXB }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="TacGia" class="form-label">Tác Giả</label>
        <input type="text" id="TacGia" v-model="sach.TacGia" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="coverImage" class="form-label">Ảnh Bìa</label>
        <input type="file" id="coverImage" @change="handleFileUpload" class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary">Lưu Thay Đổi</button>
    </form>
    <p v-if="message" class="mt-3 text-success">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      sach: {
        TenSach: '',
        DonGia: '',
        SoQuyen: '',
        NamXuatBan: '',
        NhaXuatBan: '',
        TacGia: '',
      },
      nhaXuatBanOptions: [],
      coverImage: null,
      message: '',
    };
  },
  async created() {
    const sachId = this.$route.params.id;
    await this.fetchSachData(sachId);
    await this.fetchNhaXuatBanOptions();
  },
  methods: {
    async fetchSachData(sachId) {
      try {
        const response = await axios.get(`/api/sach/${sachId}`);
        this.sach = response.data;
      } catch (error) {
        this.message = `Lỗi khi tải dữ liệu sách: ${error.message}`;
      }
    },
    async fetchNhaXuatBanOptions() {
      try {
        const response = await axios.get('/api/nxb');
        this.nhaXuatBanOptions = response.data;
      } catch (error) {
        this.message = `Lỗi khi tải danh sách nhà xuất bản: ${error.message}`;
      }
    },
    handleFileUpload(event) {
      this.coverImage = event.target.files[0];
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        formData.append('TenSach', this.sach.TenSach);
        formData.append('DonGia', this.sach.DonGia);
        formData.append('SoQuyen', this.sach.SoQuyen);
        formData.append('NamXuatBan', this.sach.NamXuatBan);
        formData.append('NhaXuatBan', this.sach.NhaXuatBan);
        formData.append('TacGia', this.sach.TacGia);

        if (this.coverImage) {
          formData.append('coverImage', this.coverImage);
        }

        await axios.put(`/api/sach/${this.sach._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        this.message = 'Sách đã được cập nhật thành công!';
      } catch (error) {
        this.message = `Lỗi khi cập nhật sách: ${error.response?.data?.message || error.message}`;
      }
    },
  },
};
</script>

<style scoped>
.editsach {
  max-width: 600px;
}
</style>
