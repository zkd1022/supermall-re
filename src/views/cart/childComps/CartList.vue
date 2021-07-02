<template>
  <div class="cart-list">
    <cart-item
      :key="index"
      v-for="(item, index) in cartList"
      :item-info="item"
    ></cart-item>
  </div>
</template>

<script>
import CartItem from "./CartItem.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    CartItem
  },

  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>

<style scoped></style>
