<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="" />

    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      default: {}
    }
  },
  computed: {
    showImg() {
      return (
        this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img
      );
    }
  },
  methods: {
    // imageLoad() {
    //   this.$bus.$emit("itemImageLoad");
    // },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid);
    }
  }
};
</script>

<style scoped>
.goods-item {
  /* 为了方便.goods-info定位到底部 */
  position: relative;
  width: 48%;
  padding-bottom: 40px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  font-size: 12px;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  /* 设置溢出的文本显示为省略号 */
  text-overflow: ellipsis;
  /* 设置段落中的内容不进行换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-tint);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
