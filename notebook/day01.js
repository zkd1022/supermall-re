// 1.Home.vue面向home.js开发
// 不要直接在Home.vue中引用request.js(避免网络请求代码与VUE逻辑代码耦合)，将网络请求有关的url放到home.js中，首页中直接使用即可


// 2.在组件中用data保存网络请求过来的数据(防止被回收)
//js中的垃圾回收机制:当一个对象没有被任何变量名指向的时候，该对象会被回收

// 3.Home.vue中只放最主要的逻辑（轮播图的模板抽取到一个新的组件HomeSwiper中）


// 4.顶部导航条的固定定位写法:
// .home-nav {
//     position: fixed;
//     left: 0;
//     right: 0;
//     top: 0;
//     z-index: 9;
//     background-color: var(--color-tint);
//     color: #fff;
//   }


// 5.TabControl组件使用时只是文字不一样，内部定义时不推荐使用插槽


// 6.将Home.vue中created钩子中的代码简化，处理主要逻辑，具体的方法实现交给methods


// 7.如果把点击事件定义在BackTop组件中,那么如何在BackTop组件中操作Scroll中的代码？ ---可以但没必要
    // 直接在Home的back-top组件中用@click.native="backClick"监听点击事件



// 8.当props传进来的值是对象或数组时，default必须是个函数

 // 9.通过this.$bus.$emit可以向<<事件总线>>中发射事件，爷爷组件可以通过this.$bus.$on监听该事件并回调相应的业务函数


 
//10.所有的组件都有一个属性:$el， 用于获取该组件中的元素


// 11.购物车商品选中的check应该添加到cartlist数组元素的属性中（对象模型中），再由数据来驱动视图的更新



//12.every():一假即假 ，而且只要有一个元素是假，其后面的元素将不再遍历。         //some()：一真即真