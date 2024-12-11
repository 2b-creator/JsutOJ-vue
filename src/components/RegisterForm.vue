<template>
    <div>

        <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
            <div class="center">
                <h2>注册</h2>
            </div>
            <br>
            <div class="text-subtitle-1 text-medium-emphasis">用户名</div>

            <v-text-field density="compact" placeholder="请输入用户名" prepend-inner-icon="mdi-account" v-model="username"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">学号</div>

            <v-text-field density="compact" placeholder="请输入学号" prepend-inner-icon="mdi-card-account-mail"
                v-model="stu_id" variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis">邮箱</div>

            <v-text-field density="compact" v-model="email" placeholder="请输入邮箱" prepend-inner-icon="mdi-email"
                variant="outlined"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                密码
            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="请输入密码" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible" v-model="password"></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                确认密码
            </div>

            <v-text-field :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                density="compact" placeholder="请再次输入密码" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                @click:append-inner="visible = !visible" v-model="passwordConfirm"></v-text-field>

            <!-- <v-card class="mb-12" color="surface-variant" variant="tonal">
                <v-card-text class="text-medium-emphasis text-caption">
                    没有账号？<a href="#">去注册</a>
                </v-card-text>
            </v-card> -->

            <v-btn @click="registerNewUser" class="mb-8" color="blue" size="large" variant="tonal" block>
                注册
            </v-btn>

            <!-- <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                    注册<v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text> -->
        </v-card>
    </div>
</template>
<script lang="ts">
import router from '@/router';
import axios from 'axios';
import * as CryptoJS from 'crypto-js';
function md5_encrypt(input_strings: string): string {
    // 使用 crypto-js 库进行 MD5 加密
    const hash = CryptoJS.MD5(input_strings);
    // 返回加密后的十六进制字符串
    return hash.toString(CryptoJS.enc.Hex);
}
let flag = 0;
interface RegisterResponse {
    access_token: string
}

const registerPost = async (username: string, stu_id: string, password_hash_cm: string, email_cm: string) => {
    try {
        const apiUrl = 'http://192.168.1.105:8000';
        const resp = await axios.post<RegisterResponse>(`${apiUrl}/api/register`, { username, password_hash_cm, email_cm, stu_id });
        const accessToken = resp.data.access_token;
        console.log(accessToken);
        localStorage.setItem('access_token', accessToken);
    } catch (error) {
        flag = 1;
    } finally {
        if (flag) {

        }
    }
}

axios.interceptors.request.use(
    config => {
        // 从localStorage获取token
        const token = localStorage.getItem('access_token');

        if (token) {
            // 将token添加到请求头
            config.headers['access-token'] = `${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
export default {
    data: () => (
        {
            visible: false,
            email: "" as string,
            username: "" as string,
            password: "" as string,
            passwordConfirm: "" as string,
            stu_id: "" as string,
        }
    ),
    methods: {
        registerNewUser() {
            registerPost(this.username, this.stu_id, md5_encrypt(this.password), this.email);
        }
    }
}
</script>