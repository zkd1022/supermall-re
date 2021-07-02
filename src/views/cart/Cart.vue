<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <template #center>购物车({{ cartLength }})</template>
    </nav-bar>
    <scroll class='scroll-cart' ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import CartList from "./childComps/CartList.vue";
import CartBottom from "./childComps/CartBottom";

import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { mapGetters } from "vuex";

export default {
  name: "",
  components: {
    NavBar,
    CartList,
    CartBottom,
    Scroll
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartLength"])
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

#cart {
  height: 100vh;
}

.scroll-cart {
  height: calc(100% - 44px - 49px - 40px);
  overflow: hidden;
}
</style>
