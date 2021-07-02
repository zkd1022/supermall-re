<template>
  <div class="recommend">
    <div
      class="recommend-item"
      :key="index"
      v-for="(item, index) in recommends"
    >
      <a :href="item.link">
        <img :src="item.image" />
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    recommends: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
.recommend{
  display: flex;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 10px solid #eee;
  font-size: 12px;
  justify-content: space-around;
}

.recommend-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}

</style>
