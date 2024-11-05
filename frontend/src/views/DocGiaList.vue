<template>
  <div class="container mt-4">
    <h2 class="mb-4">Danh Sách Đọc Giả</h2>
    <table class="table table-striped">
      <thead>
        <tr>
          <th><strong>Họ</strong></th>
          <th><strong>Tên</strong></th>
          <th><strong>Ngày Sinh</strong></th>
          <th><strong>Địa Chỉ</strong></th>
          <th><strong>Email</strong></th>
          <th><strong>Điện Thoại</strong></th>
          <th><strong>Hành Động</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="docgia in docgias" :key="docgia._id">
          <td>{{ docgia.HoLot }}</td>
          <td>{{ docgia.Ten }}</td>
          <td>{{ new Date(docgia.NgaySinh).toLocaleDateString() }}</td>
          <td>{{ docgia.DiaChi }}</td>
          <td>{{ docgia.Email }}</td>
          <td>{{ docgia.DienThoai }}</td>
          <td>
            <button class="btn btn-primary btn-sm" @click="getPhieuMuon(docgia._id)">
              Xem Phiếu Mượn
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal fade" id="phieuMuonModal" tabindex="-1" aria-labelledby="phieuMuonModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="phieuMuonModalLabel">Danh Sách Phiếu Mượn</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul v-if="phieuMuons.length > 0">
              <li v-for="phieu in phieuMuons" :key="phieu._id">
                Sách: {{ phieu.MaSach.TenSach }} - Ngày Mượn: {{ new Date(phieu.NgayMuon).toLocaleDateString() }}
                - Ngày Trả: {{ new Date(phieu.NgayTra).toLocaleDateString() }} - Số Lượng: {{ phieu.SoLuong }}
              </li>
            </ul>
            <p v-else>Không có phiếu mượn nào</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Modal } from 'bootstrap'; 

export default {
  data() {
    return {
      docgias: [],
      phieuMuons: [], 
    };
  },
  methods: {
    async fetchDocGias() {
      try {
        const response = await axios.get('/api/docgia');
        this.docgias = response.data;
      } catch (error) {
        console.error('Lỗi khi lấy danh sách đọc giả:', error.message);
      }
    },
    async getPhieuMuon(maDocGia) {
      try {
        const response = await axios.get(`/api/theodoi/docgia/${maDocGia}`);
        this.phieuMuons = response.data;
        
        const modal = new Modal(document.getElementById('phieuMuonModal'));
        modal.show();
      } catch (error) {
        console.error('Lỗi khi lấy danh sách phiếu mượn:', error.message);
      }
    },
  },
  mounted() {
    this.fetchDocGias();
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
