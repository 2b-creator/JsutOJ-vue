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

                    <v-container justify="center">
                        <RegisterForm />
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

<script lang="ts" setup>

</script>