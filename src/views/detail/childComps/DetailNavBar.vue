<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>

      <template #center>
        <div class="title">
          <div
            :key="index"
            v-for="(item, index) in titles"
            @click="itemClick(index)"
            :class="{ active: currentIndex === index }"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("navClick", index);
    },
    backClick() {
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  justify-content: space-around;
  font-size: 13px;
}
.back img {
  margin-top: 12px;
}
.active {
  color: var(--color-high-text);
}
</style>
