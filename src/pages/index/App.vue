<template>
  <div id="app-box">
    <router-view></router-view>
    <tabbar>
      <tabbar-item selected link="/find">
        <i slot="icon" class="iconfont icon-changpian"></i>
        <span slot="label">发现</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span slot="label">视频</span>
      </tabbar-item>
      <tabbar-item link="">
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
  </div>
</template>

<script>
import { ViewBox, Tabbar, TabbarItem } from "vux";

export default {
  name: "app",
  components: {
    ViewBox,
    Tabbar,
    TabbarItem
  }
};
</script>

<style lang="less">
@import "../../assets/less/music.less";
@import "~vux/src/styles/index.less";

html,
body,
#app-box {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  background-color: #fbf9fe;
}
#app-box {
  box-sizing: border-box;
  padding-bottom: 50px;
  .weui-tabbar {
    background-color: #222;
    position: fixed;
    .iconfont {
      line-height: 27px;
    }
  }
}
</style>
