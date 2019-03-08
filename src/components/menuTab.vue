<template>
  <tabbar>
    <tabbar-item selected link="/find">
      <i slot="icon" class="iconfont icon-changpian"></i>
      <span slot="label">发现</span>
    </tabbar-item>
    <tabbar-item show-dot>
      <i slot="icon" class="iconfont icon-shipin"></i>
      <span slot="label">视频</span>
    </tabbar-item>
    <tabbar-item  link="">
      <i slot="icon" class="iconfont icon-music"></i>
      <span slot="label">我的</span>
    </tabbar-item>
    <tabbar-item badge="2">
      <i slot="icon" class="iconfont icon-pengyou"></i>
      <span slot="label">朋友</span>
    </tabbar-item>
    <tabbar-item badge="2">
      <i slot="icon" class="iconfont icon-zhanghao"></i>
      <span slot="label">账号</span>
    </tabbar-item>
  </tabbar>

</template>

<script>
//import { Tabbar, TabbarItem } from "vux";

export default {
  components: {
    
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: "Hello World!"
    };
  }
};
</script>

<style lang="less">

</style>
