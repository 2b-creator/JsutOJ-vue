<template transition="fade-transition">
    <div class="border-thin">
        <v-sheet :elevation="9">
            <v-container height="60">
                <v-row align="center" justify="end">
                    <h2 class="ma-3"><a href="/">OnlineJudge-JSUT</a></h2>
                    <v-row align="center" justify="end">
                        <router-link to="/">
                            <v-col cols="auto">
                                <v-btn variant="text" density="default">主页</v-btn>
                            </v-col>
                        </router-link>

                        <router-link to="/practice">
                            <v-col cols="auto">
                                <v-btn variant="text" density="default">练习</v-btn>
                            </v-col>
                        </router-link>

                        <v-col cols="auto">
                            <v-btn variant="text" density="default">竞赛</v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn variant="text" density="default">标签</v-btn>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn @click="setJumpRouter" variant="text" density="default">{{ loginStatus }}</v-btn>
                        </v-col>
                    </v-row>
                    <v-container class="overflow-auto">
                        <v-row class="ma-3">
                            <h1 class="ma-3">练习</h1>
                        </v-row>
                        <v-row class="ma-3" v-for="(item, index) in practiceCards" :key="item.id">
                            <v-card width="10000" variant="tonal">
                                <router-link :to="{ name: '/problem_detail', query: { id: item.id } }">
                                    <v-card-title>{{ item.title }}</v-card-title>
                                </router-link>
                                <v-card-text>{{ item.tag }}</v-card-text>
                            </v-card>
                        </v-row>
                    </v-container>
                </v-row>
            </v-container>
        </v-sheet>
    </div>
</template>
<style scoped>
.router-link-active {
    text-decoration: none;
    color: white;
}

a {
    text-decoration: none;
    color: white;
}
</style>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import router from '@/router';

let loginStatus = '登录';
let routeDirect = '/login';
axios.interceptors.request.use(
    config => {
        // 从localStorage获取token
        const token = localStorage.getItem('access_token');

        if (token) {
            // 将token添加到请求头
            config.headers['access-token'] = `${token}`;
            routeDirect = '/'
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
interface PracticeCard {
    id: number;
    title: string;
    tag: string;
}

export default defineComponent({
    beforeMount() {
        this.getProblems();
        const token = localStorage.getItem('access_token');

        if (token) {
            this.loginStatus = '个人';
            this.routeDirect = '/';
        }
    },
    data() {
        return {
            // 定义数据的类型
            practiceCards: [] as PracticeCard[],
            page: 0 as number,
            loginStatus: '登录' as String,
            routeDirect: '/login' as String,
        };
    },
    methods: {
        async getProblems() {
            const apiUrl = 'http://192.168.1.105:8000';
            await axios.get(`${apiUrl}/api/get_problems?page=1`).then(response => {
                console.log(response.data.datas)
                this.practiceCards = response.data.datas;
            }).catch(error => { console.error(error) });
        },
        setJumpRouter() {
            router.push({ path: routeDirect })
        }
    }
});
</script>
