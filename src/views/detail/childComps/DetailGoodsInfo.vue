<template>
  <div
    class="goods-info"
    v-if="
      Object.keys(detailInfo).length !== 0 &&
        detailInfo.detailImage[0].list !== null
    "
  >
    <div class="info-desc" clear-fix>
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="info-list">
      <img
        :src="item"
        :key="index"
        v-for="(item, index) in detailInfo.detailImage[0].list"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    };
  },
  methods: {
     imgLoad() {
      //   this.counter +=1
      //   判断，等所有的图片都加载完后，只用进行一次的事件发送
      // 类似于防抖函数，防抖函数在detail组件中接收时应用，
      // 但由于detail组件已经做了混入，混入中也有防抖函数，所以可以将防抖函数保存在data中，就可以在detail组件中任意位置都可用了
      if (++this.counter === this.imagesLength) {
        this.$emit("imgLoad");
      }
    }
  }
};
</script>

<style scoped>
.info-desc {
  padding: 0 15px;
}
.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  font-size: 15px;
  color: #333;
}

.info-list img {
  width: 100%;
  margin-bottom: 1px;
}
</style>
