<template>
  <div class="login">
    <h3>Đăng Nhập {{ roleName }}</h3>
    <Form @submit="handleLogin" :validation-schema="loginFormSchema">
      <div class="mb-3">
        <label for="username" class="form-label">Tài Khoản:</label>
        <Field name="username" type="text" class="form-control" id="username" v-model="username" />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mật Khẩu:</label>
        <Field name="password" type="password" class="form-control" id="password" v-model="password" />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <button type="submit" class="btn btn-primary w-100">Đăng Nhập</button>
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      username: "",
      password: "",
      loginFormSchema: yup.object().shape({
        username: yup.string().required("Vui lòng nhập tài khoản."),
        password: yup.string().required("Vui lòng nhập mật khẩu."),
      }),
    };
  },
  computed: {
    roleName() {
      if (this.role === "docgia") return "Đọc Giả";
      if (this.role === "quanly") return "Quản Lý";
      if (this.role === "nhanvien") return "Nhân Viên";
    },
  },
  methods: {
    handleLogin() {
      console.log(`Đăng nhập với tài khoản: ${this.username} vai trò: ${this.role}`);
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
}
</style>
