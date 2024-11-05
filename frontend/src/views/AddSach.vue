<template>
  <div class="addsach container mt-4">
    <h2 class="mb-4">Thêm Sách Mới</h2>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <div class="mb-3">
        <label for="TenSach" class="form-label">Tên Sách</label>
        <input type="text" id="TenSach" v-model="sach.TenSach" required class="form-control" />
      </div>

      <div class="mb-3">
        <label for="DonGia" class="form-label">Đơn Giá</label>
        <input type="number" id="DonGia" v-model="sach.DonGia" required class="form-control" />
      </div>

      <div class="mb-3">
        <label for="SoQuyen" class="form-label">Số Quyển</label>
        <input type="number" id="SoQuyen" v-model="sach.SoQuyen" required class="form-control" />
      </div>

      <div class="mb-3">
        <label for="NamXuatBan" class="form-label">Năm Xuất Bản</label>
        <input type="number" id="NamXuatBan" v-model="sach.NamXuatBan" required class="form-control" />
      </div>

      <div class="mb-3">
        <label for="TacGia" class="form-label">Tác Giả</label>
        <input type="text" id="TacGia" v-model="sach.TacGia" required class="form-control" />
      </div>

      <div class="mb-3">
        <label for="MaNXB" class="form-label">Nhà Xuất Bản</label>
        <select v-model="selectedNXB" @change="checkNXBSelection" class="form-select" required>
          <option v-for="nxb in nxbList" :key="nxb._id" :value="nxb._id">
            {{ nxb.TenNXB }}
          </option>
          <option value="new">Thêm mới nhà xuất bản</option>
        </select>
      </div>

      <div v-if="isAddingNewNXB" class="mb-3">
        <label for="newNXBName" class="form-label">Tên Nhà Xuất Bản Mới</label>
        <input type="text" id="newNXBName" v-model="newNXB.TenNXB" required class="form-control" />
        <label for="newNXBAddress" class="form-label mt-2">Địa Chỉ</label>
        <input type="text" id="newNXBAddress" v-model="newNXB.DiaChi" class="form-control" />
        <label for="newNXBPhone" class="form-label mt-2">Điện Thoại</label>
        <input type="text" id="newNXBPhone" v-model="newNXB.DienThoai" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="coverImage" class="form-label">Ảnh Bìa</label>
        <input type="file" id="coverImage" @change="handleFileUpload" class="form-control" />
      </div>

      <button type="submit" class="btn btn-success">Thêm Sách</button>
      <p v-if="message">{{ message }}</p>
    </form>
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
        TacGia: '',
      },
      coverImage: null,
      message: '',
      nxbList: [],
      selectedNXB: null,
      isAddingNewNXB: false,
      newNXB: {
        TenNXB: '',
        DiaChi: '',
        DienThoai: ''
      }
    };
  },
  methods: {
    async fetchNXBList() {
      try {
        const response = await axios.get('/api/nxb');
        this.nxbList = response.data;
      } catch (error) {
        console.error('Lỗi khi tải danh sách nhà xuất bản:', error);
      }
    },
    checkNXBSelection() {
      this.isAddingNewNXB = this.selectedNXB === 'new';
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
        formData.append('TacGia', this.sach.TacGia);

        if (this.isAddingNewNXB) {
          const nxbResponse = await axios.post('/api/nxb', this.newNXB);
          formData.append('MaNXB', nxbResponse.data._id);
        } else {
          formData.append('MaNXB', this.selectedNXB);
        }

        if (this.coverImage) {
          formData.append('coverImage', this.coverImage);
        }

        const response = await axios.post('/api/sach', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        this.message = 'Sách đã được thêm thành công!';
        this.resetForm();
        this.$router.push("/");
      } catch (error) {
        this.message = `Lỗi khi thêm sách: ${error.response?.data?.message || error.message}`;
      }
    },
    resetForm() {
      this.sach = {
        TenSach: '',
        DonGia: '',
        SoQuyen: '',
        NamXuatBan: '',
        TacGia: '',
      };
      this.coverImage = null;
      this.selectedNXB = null;
      this.isAddingNewNXB = false;
      this.newNXB = {
        TenNXB: '',
        DiaChi: '',
        DienThoai: ''
      };
    }
  },
  mounted() {
    this.fetchNXBList();
  }
};
</script>

<style scoped>
.addsach {
  max-width: 600px;
}
</style>
