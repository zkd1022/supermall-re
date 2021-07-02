<template>
  <goods-list :goods="details"></goods-list>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList.vue";
import GridView from "components/common/gridview/GridView.vue";
export default {
  components: { GoodsList, GridView },
  props: {
    details: Array
  }
};
</script>

<style scoped></style>
