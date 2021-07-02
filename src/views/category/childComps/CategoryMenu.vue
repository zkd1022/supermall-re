<template>
  <div class="menu">
    <div
      class="menu-item"
      :key="index"
      v-for="(item, index) in categoryList"
      @click="itemClick(index)"
      :class="{ active: currentIndex === index }"
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryList: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("listClick", index);
    }
  }
};
</script>

<style scoped>
.menu {
  /* float: left; */
  width: 100px;
  text-align: center;
  padding-bottom: 14px;
}
.menu-item {
  line-height: 45px;
  font-size: 14px;
  background-color: #f6f6f6;
}

.active {
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 2px solid var(--color-high-text);
}
</style>
