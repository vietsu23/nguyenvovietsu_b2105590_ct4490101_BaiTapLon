<template>
    <Form ref="form" @submit="submitDocGia" :validation-schema="docGiaFormSchema">
        <div class="form-group">
            <label for="HoLot">Họ:</label>
            <Field id="HoLot" name="HoLot" as="input" type="text" class="form-control" v-model="docGiaLocal.HoLot" />
            <ErrorMessage name="HoLot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Ten">Tên:</label>
            <Field id="Ten" name="Ten" as="input" type="text" class="form-control" v-model="docGiaLocal.Ten" />
            <ErrorMessage name="Ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgaySinh">Ngày Sinh:</label>
            <Field id="NgaySinh" name="NgaySinh" as="input" type="date" class="form-control" v-model="docGiaLocal.NgaySinh" />
            <ErrorMessage name="NgaySinh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Phai">Giới Tính:</label>
            <Field id="Phai" name="Phai" as="select" class="form-control" v-model="docGiaLocal.Phai">
                <option value="" disabled>Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
            </Field>
            <ErrorMessage name="Phai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DiaChi">Địa Chỉ:</label>
            <Field id="DiaChi" name="DiaChi" as="input" type="text" class="form-control" v-model="docGiaLocal.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DienThoai">Điện Thoại:</label>
            <Field id="DienThoai" name="DienThoai" as="input" type="tel" class="form-control" v-model="docGiaLocal.DienThoai" />
            <ErrorMessage name="DienThoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Email">E-mail:</label>
            <Field id="Email" name="Email" as="input" type="email" class="form-control" v-model="docGiaLocal.Email" />
            <ErrorMessage name="Email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Password">Mật Khẩu:</label>
            <Field id="Password" name="Password" as="input" type="password" class="form-control" v-model="docGiaLocal.Password" />
            <ErrorMessage name="Password" class="error-feedback" />
        </div>
        <br/>
        <div class="form-group text-center">
            <button type="submit" class="btn btn-primary">Đăng ký</button>
        </div>
    </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ["submit:docgia"],
    props: {
        docGia: { type: Object, required: true }
    },
    data() {
        const docGiaFormSchema = yup.object().shape({
            HoLot: yup.string().required("Họ không được để trống."),
            Ten: yup.string().required("Tên không được để trống."),
            NgaySinh: yup.date().required("Ngày sinh không được để trống."),
            Phai: yup.string().required("Giới tính là bắt buộc."),
            DiaChi: yup.string().required("Địa chỉ không được để trống."),
            DienThoai: yup.string().matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Số điện thoại không hợp lệ.").required("Điện thoại là bắt buộc."),
            Email: yup.string().email("E-mail không đúng.").required("E-mail là bắt buộc."),
            Password: yup.string().required("Mật khẩu không được để trống.").min(6, "Mật khẩu tối thiểu 6 ký tự.")
        });

        return {
            docGiaLocal: this.docGia,
            docGiaFormSchema,
        };
    },
    methods: {
        async submitDocGia() {
            try {
                const isValid = await this.$refs.form.validate();
                if (isValid) {
                    this.$emit("submit:docgia", this.docGiaLocal);
                }
            } catch (error) {
                console.error("Lỗi khi xác thực form:", error);
            }
        }
    }
};
</script>

<style scoped>
.error-feedback {
    color: red;
}
</style>
