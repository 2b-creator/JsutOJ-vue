<template transition="fade-transition">
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
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-card ref="leftCard">
                                        <v-container>
                                            <v-card-title>{{ problemAttribute.title }}</v-card-title>
                                            <v-card-text>
                                                <MarkdownMath v-if="problemAttribute.description"
                                                    markdownContent="## 题目描述" />
                                            </v-card-text>
                                            <v-card-text>
                                                <MarkdownMath v-if="problemAttribute.description"
                                                    :markdownContent="problemAttribute.description.toString()" />
                                            </v-card-text>
                                            <v-card-text>
                                                <MarkdownMath v-if="problemAttribute.description"
                                                    markdownContent="## 输入描述" />
                                            </v-card-text>
                                            <v-card-text>
                                                <MarkdownMath v-if="problemAttribute.description"
                                                    :markdownContent="problemAttribute.input_description.toString()" />
                                            </v-card-text>
                                            <v-card-text>
                                                <MarkdownMath v-if="problemAttribute.description"
                                                    markdownContent="## 输出描述" />
                                            </v-card-text>
                                            <v-card-text>
                                                <MarkdownMath v-if="problemAttribute.description"
                                                    :markdownContent="problemAttribute.output_description.toString()" />
                                            </v-card-text>
                                        </v-container>
                                        <v-container v-if="problemAttribute.description">
                                            <v-row>
                                                <v-col>
                                                    <v-card-text>
                                                        <MarkdownMath markdownContent="## 输入样例" />
                                                        <highlightjs id="inputSample" language='plaintext'
                                                            :code="problemAttribute.sample_input" />
                                                        <v-btn class="btn" data-clipboard-action="copy"
                                                            data-clipboard-target="#inputSample"
                                                            @click="copyAction">复制样例</v-btn>
                                                    </v-card-text>
                                                </v-col>
                                                <v-col>
                                                    <v-card-text>
                                                        <MarkdownMath markdownContent="## 输出样例" />
                                                        <highlightjs language="plaintext"
                                                            :code="problemAttribute.sample_output" />
                                                    </v-card-text>
                                                </v-col>
                                            </v-row>
                                        </v-container>

                                    </v-card>
                                </v-col>
                                <v-col>
                                    <v-card :height="leftHeight">
                                        <v-card-title>代码编辑区</v-card-title>
                                        <v-card-text>
                                            <v-container>
                                                <MonacoEditorComp ref="monacoEditor" @update:modelValue="handleEditorChange" v-model="editorText" name="monacoEditor"
                                                    style="height: 500px;" anguage="cpp">
                                                </MonacoEditorComp>
                                            </v-container>
                                            <v-row justify="end">
                                                <v-btn @click="submitCodes">
                                                    提交
                                                </v-btn>
                                            </v-row>

                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-container>

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
import 'highlight.js/styles/monokai.css';
import MarkdownMath from './../components/MarkdownMath.vue';
import ClipboardJS from 'clipboard'; // 导入 clipboard.js
import hljsVuePlugin from "@highlightjs/vue-plugin";
import router from '@/router';
import MonacoEditorComp from '@/components/MonacoEditorComp.vue';
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
    components: {
        MarkdownMath, highlightjs: hljsVuePlugin.component, MonacoEditorComp
    },
    beforeMount() {
        this.getProblems();
        const token = localStorage.getItem('access_token');

        if (token) {
            this.loginStatus = '个人';
            this.routeDirect = '/';
        }
    },
    mounted() {
        this.getHeight();
        // this.$nextTick(
        //     () => {
        //         this.getHeight();
        //     }
        // )
    },
    created() {
        window.addEventListener('resize', this.getHeight)
    },
    setup() {
        const editorText = ref('#include <iostream>\nusing namespace std;\nint main()\n{\n    // your code here\n    return 0;\n}') // 存储编辑器的文本内容
        const monacoEditor = ref()

        // 获取编辑器的内容
        const getEditorContent = () => {
            const value = editorText.value
            console.log('当前编辑器的文本内容：', value)
        }

        // 监听文本更新
        const handleEditorChange = (newValue: string) => {
            editorText.value = newValue
        }

        return {
            editorText,
            monacoEditor,
            getEditorContent,
            handleEditorChange
        }
    },
    data() {
        return {
            // 定义数据的类型
            problemAttribute: {} as ProblemAttribute,
            page: 0 as number,
            markdownText: '' as String,
            clickText: '' as String,
            leftHeight: 0 as number,
            loginStatus: '登录' as String,
            routeDirect: '/login' as String,
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
        getProblems() {
            const apiUrl = 'http://192.168.1.105:8000';
            axios.get(`${apiUrl}/api/get_problem_detail?id=` + this.$route.query.id).then(response => {
                this.problemAttribute = response.data.data;
                console.log(this.problemAttribute);
            }).catch(error => { console.error(error) });
        },
        copyAction() {
            var clipboard = new ClipboardJS('.btn');

            //5. 复制成功的响应事件【按F12控制台可见】
            clipboard.on('success', function (e) {
                console.log(e);
                //打印动作信息（copy或者cut）
                console.info('Action:', e.action);
                //打印复制的文本
                console.info('Text:', e.text);
                //打印trigger
                console.info('Trigger:', e.trigger);
            });

            //6. 复制失败的响应事件
            clipboard.on('error', function (e) {
                console.log(e);
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });

        },
        getHeight() {
            const element = this.$refs.leftCard as HTMLElement;
            const height = element.offsetHeight;
            this.leftHeight = height;
        },
        setJumpRouter() {
            router.push({ path: routeDirect })
        },
        submitCodes() {
            const token = localStorage.getItem('access_token');
            if (token) {
                router.push({ path: '/check_result', query: { id: this.$route.query.id, codes: this.editorText } });
            }
            else {
                router.push({ path: '/login' });
            }
        }
    }
});
</script>
