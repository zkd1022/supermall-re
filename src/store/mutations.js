export default {
  //mutations中的每个方法尽可能完成的事件比较单一
  addCart(state, payload) {
    state.cartList.push(payload)
  },

  addCounter(state, payload) {
    payload.count++
  }
}
