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

                        <router-link to="/login">
                            <v-col cols="auto">
                                <v-btn variant="text" density="default">登录</v-btn>
                            </v-col>
                        </router-link>
                    </v-row>
                    <v-container class="overflow-auto">
                        <v-row class="ma-3">
                            <h1 class="ma-3">{{ problemAttribute.title }}</h1>
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

interface ProblemAttribute {
    title: string;
    description: string;
    input_description: string;
    output_description: string;
    sample_input: string;
    sample_output: string;
    difficulty: number;
    time_limit: number;
    memory_limit: number;
    tag: string;
}

export default defineComponent({
    beforeMount() {
        this.getProblems();
    },
    data() {
        return {
            // 定义数据的类型
            problemAttribute: {} as ProblemAttribute,
            page: 0 as number,
        };
    },
    methods: {
        loadPracticeCards(jsonData: string) {
            try {
                console.log(jsonData);
                const data = JSON.parse(jsonData);
                console.log(data);
                return data;
            } catch (error) {
                console.error("Invalid JSON data", error);
            }
        },
        async getProblems() {
            await axios.get('http://127.0.0.1:8000/api/get_problem_detail?id=' + this.$route.query.id).then(response => {
                this.problemAttribute = response.data.data;
                console.log(this.problemAttribute)
            }).catch(error => { console.error(error) });
        }
    }
});
</script>
