<template>
  <div class="wrapper" ref="wrapper">
    <div class="content clearfix">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    observeImage: {
      type: Boolean,
      default: true
    },
    observeDOM: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeImage: this.observeImage,
      observeDOM: this.observeDOM,
      click: true
    });

    //监听滚动的位置
    //probeType为2或3时才记录postion,这时再做监听
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        this.$emit("scroll", position);
      });
    }

    //监听滚动到底部
    //当pullUpLoad为true时才做监听
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }

    console.log(this.scroll);
  },
  methods: {
    //将scroll.scrollTo()内置方法封装成Scroll组件的一个方法
    scrollTo(x, y, time = 300) {
      //先判断scroll对象是否已经创建
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
.clearfix:after {
  content: "";
  clear: both;
  display: block;
}
</style>
