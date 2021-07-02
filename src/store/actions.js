export default {
  //除了异步操作以外，包含有逻辑判断的方法也写到actions中



  addToCart({
    state,
    commit
  }, product) {
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find((item) => {
        return item.iid === product.iid
      })

      if (oldProduct) {
        //注意oldProduct为浅拷贝，count属性也会添加到cartList的数组元素中
        //   oldProduct.count += 1
        commit('addCounter', oldProduct)
        resolve('当前商品数量+1')
      } else {
        product.count = 1
        commit('addCart', product)
        resolve('添加了新的商品')
      }

    })
  }
}
