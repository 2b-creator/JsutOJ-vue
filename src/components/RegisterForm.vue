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

            <v-text-field density="compact" placeholder="请输入邮箱" prepend-inner-icon="mdi-email" v-model="stu_id"
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

            <v-btn class="mb-8" color="blue" size="large" variant="tonal" block>
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
export default {
    data: () => (
        {
            visible: false,
            username: "" as String,
            password: "" as String,
            passwordConfirm: "" as String,
            stu_id: "" as String,
        }
    )
}
</script>