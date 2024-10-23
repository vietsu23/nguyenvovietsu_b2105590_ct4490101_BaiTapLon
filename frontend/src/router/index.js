import { createWebHistory, createRouter } from "vue-router";
// import SachView from "@/views/SachView.vue";
// import NhaXuatBanView from "@/views/NhaXuatBanView.vue"; 
// import TheoDoiMuonSachView from "@/views/TheoDoiMuonSachView.vue"; 
// import NhanVienView from "@/views/NhanVienView.vue"; 

const routes = [
   {
    path: "/",
    name: "login",
    component: () => import("@/views/LoginSelection.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
  },
  {
     path: "/sachs",
     name: "sach",
     component: () => import("@/views/sachsList.vue")
   },
//   {
//     path: "/nxb",
//     name: "nhaxuatban",
//     component: NhaXuatBanView,
//   },
//   {
//     path: "/theodoi",
//     name: "theodoi",
//     component: TheoDoiMuonSachView,
//   },
//   {
//     path: "/nhanvien",
//     name: "nhanvien",
//     component: NhanVienView,
//   },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
