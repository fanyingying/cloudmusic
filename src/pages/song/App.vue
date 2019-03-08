<template>
  <view-box ref="viewBox" id="app-box">
    <router-view></router-view>
  </view-box>
</template>

<script>
import { ViewBox } from "vux";

export default {
  name: "app",
  components: {
    ViewBox
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/index.less";
@import "../../assets/less/music.less";
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
body {
  background-color: #fbf9fe;
}
#app-box{
.weui-tabbar{
        background-color: #222;
        position: fixed;
        .iconfont{
            line-height: 27px;
        }
    }
}

</style>
