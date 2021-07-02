<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center> 购物街 </template>
    </nav-bar>
    <tab-control
      class="tab-control-top"
      ref="tabControl1"
      :title="['流行', '新款', '精选']"
      @itemClick="tabControlClick"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="scroll"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      :observe-image="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>

      <recommend-view :recommends="recommends"></recommend-view>

      <feature-view></feature-view>

      <tab-control
        class="tab-control-bottom"
        ref="tabControl2"
        :title="['流行', '新款', '精选']"
        @itemClick="tabControlClick"
      ></tab-control>

      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import HomeSwiper from "./childComps/HomeSwiper.vue";
import FeatureView from "./childComps/FeatureView.vue";
import RecommendView from "./childComps/RecommendView.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { backTopMixin } from "common/mixin.js";

export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,

    HomeSwiper,
    FeatureView,
    RecommendView
  },
  //返回顶部混入注册
  mixins: [backTopMixin],

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false
    };
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /*  事件监听相关方法 */
    tabControlClick(index) {
      const arr = ["pop", "new", "sell"];
      this.currentType = arr[index];

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.backtop的显示与隐藏
      this.isShowBackTop = -position.y > 1000;

      //2.决定tabControl是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentType);
    },

    /*  网络请求相关方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log(res);
      });
    },

    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        console.log(res);
        this.goods[type].page += 1;

        //完成了上拉加载更多 （只有调用finishPullUp后才能进行第二次的上拉）
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  /* position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0; */
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
}

.scroll {
  /* 采用绝对定位的方法确定content的高度 */
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* height: calc(100% - 44px - 49px);
  overflow: hidden; */
}

.tab-control-top {
  position: relative;
  z-index: 9;
}
</style>
