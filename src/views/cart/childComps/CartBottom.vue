<template>
  <div class="cart-bottom-bar">
    <div>
      <check-button
        class="check-button"
        @click.native="checkClick"
        :is-checked="isSelectAll"
      ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计: {{ totalPrice }}</div>

    <div class="calculate">去计算: ({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  components: {
    CheckButton
  },
  data() {
    return {
      //   isChecked: false
    };
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      //   let sum = 0;
      //   this.$store.getters.cartList.forEach(item => {
      //     sum += parseFloat(item.price).toFixed(2);
      //   });
      //   return sum;

      return (
        "￥" +
        this.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.cartList.filter(item => {
        return item.checked;
      }).length;
    },

    isSelectAll() {
      return (
        this.cartList.length !== 0 && this.cartList.every(item => item.checked)
      );
    }
  },
  methods: {
    checkClick() {
      this.isChecked = !this.isChecked;

      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
}

.check-button {
  display: inline-block;
  vertical-align: middle;
  height: 20px;
  line-height: 20px;
  width: 20px;
  margin: 0 5px;
}

.price {
  margin-left: 20px;
}

.calculate {
  width: 80px;
  text-align: center;
  color: #fff;
  background-color: red;
}
</style>
