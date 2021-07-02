<template>
  <div class="tab-control">
    <div
      :key="index"
      v-for="(item, index) in title"
      @click="itemClick(index)"
      :class="{ active: currentIndex === index }"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    title: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    }
  }
};
</script>

<style scoped>
.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-tint);
}

.tab-control {
  display: flex;
  justify-content: space-around;
  text-align: center;
  background-color: #fff;
}

.tab-control div {
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
}
</style>
