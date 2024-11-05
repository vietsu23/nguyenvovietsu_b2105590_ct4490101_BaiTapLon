<template> 
  <div class="container mt-4">
    <h2>{{ isNhanVien ? "Chỉnh Sửa Thông Tin Nhân Viên" : "Chỉnh Sửa Thông Tin Đọc Giả" }}</h2>
    <form @submit.prevent="updateInfo">
      <div v-if="isNhanVien" class="form-group">
        <label for="hoTenNV">Họ Tên Nhân Viên</label>
        <input type="text" id="hoTenNV" v-model="nhanvien.HoTenNV" class="form-control" required />
      </div>
      <div v-else class="form-group">
        <label for="hoLot">Họ</label>
        <input type="text" id="hoLot" v-model="docgia.HoLot" class="form-control" required />
      </div>
      <div v-if="!isNhanVien" class="form-group">
        <label for="ten">Tên</label>
        <input type="text" id="ten" v-model="docgia.Ten" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="ngaySinh">Ngày Sinh</label>
        <input type="date" id="ngaySinh" v-model="currentDate" class="form-control" required />
      </div>
      <div v-if="isNhanVien" class="form-group">
        <label for="chucVu">Chức Vụ</label>
        <input type="text" id="chucVu" v-model="nhanvien.ChucVu" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="diaChi">Địa Chỉ</label>
        <input type="text" id="diaChi" v-model="currentAddress" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="dienThoai">Điện Thoại</label>
        <input type="text" id="dienThoai" v-model="currentPhone" class="form-control" required />
      </div>
      <div v-if="!isNhanVien" class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="docgia.Email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="currentPassword">Mật Khẩu Cũ</label>
        <input type="password" id="currentPassword" v-model="currentPassword" class="form-control" placeholder="Nhập mật khẩu cũ" required />
      </div>
      <div class="form-group">
        <label for="newPassword">Mật Khẩu Mới</label>
        <input type="password" id="newPassword" v-model="newPassword" class="form-control" placeholder="Nhập mật khẩu mới (nếu cần)" />
      </div>
      <div class="form-group">
        <label for="confirmNewPassword">Nhập Lại Mật Khẩu Mới</label>
        <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" class="form-control" placeholder="Nhập lại mật khẩu mới" />
      </div>
      <div class="text-center">
        <button type="submit" class="btn btn-success">Cập Nhật</button>
        <router-link to="/docgia" class="btn btn-secondary ml-2">Hủy</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isNhanVien: false,
      docgia: {
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "",
        DiaChi: "",
        DienThoai: "",
        Email: "",
      },
      nhanvien: {
        HoTenNV: "",
        NgaySinh: "",
        ChucVu: "",
        DiaChi: "",
        SoDienThoai: "",
      },
      currentPassword: "", 
      newPassword: "", 
      confirmNewPassword: "", 
    };
  },
  computed: {
    currentDate: {
      get() {
        return this.isNhanVien ? this.nhanvien.NgaySinh : this.docgia.NgaySinh;
      },
      set(value) {
        if (this.isNhanVien) {
          this.nhanvien.NgaySinh = value;
        } else {
          this.docgia.NgaySinh = value;
        }
      },
    },
    currentAddress: {
      get() {
        return this.isNhanVien ? this.nhanvien.DiaChi : this.docgia.DiaChi;
      },
      set(value) {
        if (this.isNhanVien) {
          this.nhanvien.DiaChi = value;
        } else {
          this.docgia.DiaChi = value;
        }
      },
    },
    currentPhone: {
      get() {
        return this.isNhanVien ? this.nhanvien.SoDienThoai : this.docgia.DienThoai;
      },
      set(value) {
        if (this.isNhanVien) {
          this.nhanvien.SoDienThoai = value;
        } else {
          this.docgia.DienThoai = value;
        }
      },
    },
  },
  created() {
    this.checkRole();
    this.fetchData();
  },
  methods: {
    checkRole() {
      const role = localStorage.getItem("userRole");
      this.isNhanVien = role === "nhanvien";
    },
    async fetchData() {
      const id = this.$route.params.id;
      try {
        const url = `http://localhost:3000/api/${this.isNhanVien ? 'nhanvien' : 'docgia'}/${id}`;
        const response = await axios.get(url);
        if (this.isNhanVien) {
          this.nhanvien = response.data;
        } else {
          this.docgia = response.data;
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        alert("Lỗi khi tải dữ liệu.");
      }
    },
    async updateInfo() {
      const id = this.$route.params.id;
      const url = `http://localhost:3000/api/${this.isNhanVien ? 'nhanvien' : 'docgia'}/${id}`; 

      const updatedData = this.isNhanVien ? this.nhanvien : this.docgia;
      
      const payload = {
        ...updatedData,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword || null, 
      };

      try {
        const response = await axios.put(url, payload);
        alert(response.data.message || "Cập nhật thành công!");
        this.$router.push(`/${this.isNhanVien ? 'nhanvien' : ''}`);
      } catch (error) {
        console.error("Lỗi cập nhật:", error);
        alert(error.response.data.message || "Cập nhật không thành công!");
      }
    },
  },
};
</script>
