<template>
  <div id="category">
    <nav-bar class="nav">
      <template #center>商品分类</template>
    </nav-bar>
    <scroll class="list-scroll">
      <category-menu
        :category-list="categoryList"
        @listClick="listClick"
      ></category-menu>
    </scroll>

    <scroll
      class="category-scroll"
      ref="scroll"
      :probe-type="3"
      @scroll="scroll"
    >
      <menu-detail :subcategories="showSubcategories"></menu-detail>
      <tab-control
        :title="['综合', '新品', '销量']"
        @itemClick="tabClick"
      ></tab-control>
      <content-detail :details="showContentDetails"> </content-detail>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import CategoryMenu from "./childComps/CategoryMenu.vue";
import MenuDetail from "./childComps/MenuDetail.vue";
import ContentDetail from "./childComps/ContentDetail.vue";

import {
  getCategory,
  getsubcategory,
  getContentDetail
} from "network/category.js";
import { backTopMixin } from "common/mixin.js";

export default {
  components: {
    NavBar,
    CategoryMenu,
    MenuDetail,
    TabControl,
    ContentDetail,
    Scroll
  },
  mixins: [backTopMixin],
  data() {
    return {
      currentIndex: -1,
      currentType: "pop",
      categoryList: [],
      categoryData: []
    };
  },
  created() {
    this._getCategory();
  },
  computed: {
    showSubcategories() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showContentDetails() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    // 网络请求相关
    //1.获取主数据
    _getCategory() {
      getCategory().then(res => {
        console.log(res);
        //获取标题数据
        this.categoryList = res.data.category.list;
        //创建子数据的数据结构
        for (let i = 0; i < this.categoryList.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }

        this._getsubcategory(0);
      });
    },

    //2.获取子数据
    _getsubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categoryList[index].maitKey;

      getsubcategory(maitKey).then(res => {
        console.log(res);
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getContentDetail("pop");
        this._getContentDetail("new");
        this._getContentDetail("sell");
        console.log(this.categoryData);
      });
    },

    //3.获取流行等数据放入子数据categoryDetail属性中
    _getContentDetail(type) {
      const miniWallkey = this.categoryList[this.currentIndex].miniWallkey;

      getContentDetail(miniWallkey, type).then(res => {
        this.categoryData[this.currentIndex].categoryDetail[type] = res;

        this.categoryData = { ...this.categoryData };
      });
    },

    //事件相关
    listClick(index) {
      this._getsubcategory(index);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    scroll(position) {
      if (-position.y > 1000) {
        this.isShowBackTop = true;
      } else {
        this.isShowBackTop = false;
      }
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav {
  color: #fff;
  background-color: var(--color-tint);
}

.list-scroll {
  float: left;
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}

.category-scroll {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
