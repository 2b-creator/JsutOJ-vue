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
              <h1 class="ma-3">公告</h1>
            </v-row>
            <v-row class="ma-3">
              <v-card width="10000" title="更新" subtitle="2024.11.21" variant="tonal">
                <v-card-text>完善了后端内容, 开始着手开发前端</v-card-text>
              </v-card>
            </v-row>
            <v-row class="ma-3">
              <v-card width="10000" title="HelloWorld" subtitle="2024.11.18" variant="tonal">
                <v-card-text>我们启动了该项目, 由江苏理工学院学生自主开发 oj 系统. 该系统前后端均开源至 GitHub, 如果喜欢, 请给我们一个 star 😊 <br> 后端地址在: <a
                    href="https://github.com/2b-creator/OnlineJudge-JSUT"
                    target="_blank">https://github.com/2b-creator/OnlineJudge-JSUT</a></v-card-text>
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

<script lang="ts" setup>

</script>
