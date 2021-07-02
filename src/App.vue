<template>
  <div id="app">
    <!-- 防止切换页面时前组件销毁  注意要在组件中声明name属性-->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar.vue";
export default {
  name: "App",
  components: { MainTabBar }
};
</script>

<style>
@import "assets/css/base.css";
</style>
