<template>
  <div>
    <swiper>
      <swiper-item :key="index" v-for="(item, index) in banners">
        <a :href="item.link">
          <img :src="item.image" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue";
import SwiperItem from "components/common/swiper/SwiperItem.vue";

export default {
  name: "",
  components: { Swiper, SwiperItem },
  props: {
    banners: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods:{
     imageLoad() {
      if (!this.isLoad) {
        //swiperImageLoad事件只需要发射一次即可
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
