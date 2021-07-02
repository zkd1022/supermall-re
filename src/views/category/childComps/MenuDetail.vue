<template>
  <div class="menu-detail">
    <grid-view
      class="grid"
      :cols="3"
      :lineSpace="15"
      :v-margin="20"
      v-if="subcategories.list"
    >
      <div
        class="grid-item"
        :key="index"
        v-for="(item, index) in subcategories.list"
      >
        <a :href="item.link">
          <img :src="item.image" alt="" />
        </a>
        <p class="text">{{ item.title }}</p>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridview/GridView.vue";
export default {
  components: { GridView },
  props: {
    subcategories: Object
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.menu-detail{
  width: 100%;
}

.grid-item {
  text-align: center;
  font-size: 12px;
}

.grid-item img {
  width: 80%;
}

.grid-item .text {
  margin-top: 15px;
}
</style>
