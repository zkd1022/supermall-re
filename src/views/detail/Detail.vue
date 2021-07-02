<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      ref="nav"
      @navClick="navClick"
    ></detail-nav-bar>

    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      :observe-image="true"
      @scroll="detailScroll"
    >
      <detail-swiper ref="swiper" :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        ref="goods"
        :detail-info="detailInfo"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :goods-params="goodsParams"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParams
} from "network/detail.js";
import { backTopMixin } from "common/mixin.js";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll
  },
  //返回顶部混入注册
  mixins: [backTopMixin],

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommends: [],
      topOffset: [],
      currentIndex: 0
    };
  },

  created() {
    //1.保存iid
    this.iid = this.$route.params.iid;

    //2.请求相应iid的数据
    getDetail(this.iid).then(res => {
      console.log(res.result);
      const data = res.result;
      //1) 获取顶部轮播数据
      this.topImages = data.itemInfo.topImages;
      //2) 获取商品信息数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //3) 获取商家信息数据
      this.shop = new Shop(data.shopInfo);

      //4) 保存商品的详情数据（结构比较简单不需要用class进行包装）
      this.detailInfo = data.detailInfo;

      //5) 保存商品的尺寸等数据
      this.goodsParams = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      //6) 保存商品评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate;
      }
    });

    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },
  updated() {
    //在updated中获取的offsetTop包含图片高度
    this.topOffset = [];
    this.topOffset.push(0);
    this.topOffset.push(this.$refs.param.$el.offsetTop);
    this.topOffset.push(this.$refs.comment.$el.offsetTop);
    this.topOffset.push(this.$refs.recommend.$el.offsetTop);
    //多加一个无限大的值在数组末尾
    this.topOffset.push(Number.MAX_VALUE);
  },
  destroyed() {
    console.log("组件已销毁");
  },
  methods: {
    navClick(index) {
      switch (index) {
        case 0:
          this.$refs.scroll.scroll.scrollToElement(this.$refs.swiper.$el, 300);
          break;
        case 1:
          this.$refs.scroll.scroll.scrollToElement(this.$refs.param.$el, 300);
          break;
        case 2:
          this.$refs.scroll.scroll.scrollToElement(this.$refs.comment.$el, 300);
          break;
        case 3:
          this.$refs.scroll.scroll.scrollToElement(
            this.$refs.recommend.$el,
            300
          );
          break;
      }
    },
    detailScroll(position) {
      let positionY = -position.y;

      // positionY和主题中的y进行对比
      //[0,7938,9120,9452]

      //positonY在0~7938之间  index=0
      //positonY在7938~9120之间  index=1
      //positonY在9120~9452之间  index=2
      //positonY超过9452 且小于无限大  index=3
      let { length } = this.topOffset;
      //最后一个无限大的值不需要遍历,所以i<length-1
      for (let i = 0; i < length - 1; i++) {
        if (
          //减少赋值次数
          this.currentIndex !== i &&
          positionY > this.topOffset[i] &&
          positionY < this.topOffset[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      //返回顶部
      this.isShowBackTop = -position.y > 1000;
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      product.checked = false;

      //2.提交payload给actions
      this.$store.dispatch("addToCart", product).then(res => {
        // console.log(res);
        //展示浮动文字
        this.$toast.show(res);
      });
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  /* 盖住底部的main-tabbar */
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}

.scroll {
  /* 采用绝对定位的方法确定content的高度 */
  /* position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0; */
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
