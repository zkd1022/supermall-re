<template>
  <div class="goods">
    <goods-item
      :key="index"
      v-for="(item, index) in goods"
      :goodsItem="item"
    ></goods-item>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem.vue";
export default {
  components: { GoodsItem },
  props: {
    goods: {
      type: Array,
      default: []
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
