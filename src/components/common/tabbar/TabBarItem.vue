<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: "",
    activeColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActive() {
      // return this.$route.path.indexOf(this.path) !== -1;
      //includes方法判断当前字符串是否包含子字符串
      return this.$route.path.includes(this.path)
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      //处理两次点击路由报错问题
      if (this.$route.path !== this.path) {
        this.$router.replace(this.path);
      }
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 3px 0;
  /* 去除img标签下默认的3px空隙 */
  vertical-align: middle;
}
</style>
