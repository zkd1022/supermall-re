<template>
  <div class="param-info" v-if="Object.keys(goodsParams).length !== 0">
    <table
      class="info-sizes"
      :key="index"
      v-for="(table, index) in goodsParams.sizes"
    >
      <tbody>
        <tr :key="indextr" v-for="(tr, indextr) in table">
          <td :key="indextd" v-for="(td, indextd) in tr">{{ td }}</td>
        </tr>
      </tbody>
    </table>

    <table class="info-params">
      <tbody>
        <tr :key="index" v-for="(item, index) in goodsParams.infos">
          <td class="key">{{ item.key }}</td>
          <td class="value">{{ item.value }}</td>
        </tr>
      </tbody>
    </table>

    <div class="info-img" v-if="goodsParams.image.length">
      <img :src="goodsParams.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.param-info {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.param-info tr {
  height: 42px;
  /* border-bottom: 1px solid rgba(100, 100, 100, 0.1); */
}

.param-info td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-sizes {
  width: 100%;
  /* 合并表格边框 */
  border-collapse: collapse;
}

.info-sizes tbody {
  width: 100%;
}

.info-params {
  border-top: 1px solid rgba(100, 100, 100, 0.1);
}

.info-params .key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}
.info-params .value {
  color: #eb4868;
}

.info-img img {
  width: 100%;
}
</style>
