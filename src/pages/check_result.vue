<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css">
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
                        <div class="d-flex flex-column ma-3">

                            <h2 class="ma-3">判题结果</h2>
                            <v-card class="ma-3">
                                <v-card-item>
                                    <div v-if="statusData" class="ma-1">
                                        <v-chip class="ma-1" v-for="item in statusData" :color="item.color">
                                            {{ item.code }}
                                        </v-chip>
                                    </div>
                                </v-card-item>
                            </v-card>

                        </div>
                    </v-container>
                </v-row>
            </v-container>
        </v-sheet>
    </div>
</template>
<style>
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
import { defineComponent, ref } from 'vue';
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
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
interface PostData {
    id: number,
    code: string,
    language: string,
}
interface StatusData {
    status: string,
    test_id: string,
    color: string,
    code: string,
}
function isString(value: any): boolean {
    return value instanceof String;
}
export default defineComponent(
    {
        beforeMount() {
            this.getResult()
            const token = localStorage.getItem('access_token');

            if (token) {
                this.loginStatus = '个人';
                this.routeDirect = '/';
            }
        },
        data() {
            return {
                statusData: [] as StatusData[],
                loginStatus: '登录' as String,
                routeDirect: '/login' as String,
            }
        },
        methods: {
            setJumpRouter() {
                router.push({ path: routeDirect })
            },
            getResult() {
                const data: PostData = {
                    id: Number(this.$route.query.id),
                    code: this.$route.query.codes!.toString(),
                    language: 'cpp'
                }
                console.log(data);
                const apiUrl = 'http://192.168.1.105:8000';
                axios.post(`${apiUrl}/api/submit`, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': localStorage.getItem('access_token'),

                    }
                }).then(
                    response => {
                        console.log('Response:', response.data.output);
                        if (isString(response.data.output.results)) {
                            this.statusData = response.data.output.results;
                        }
                        else {
                            this.statusData = response.data.output;
                        }
                    }
                )
            }
        }
    }
)
</script>