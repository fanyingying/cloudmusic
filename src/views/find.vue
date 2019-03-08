<template>
  <div class="music-app find">
    <!-- <search placeholder="搜索歌曲、歌手、专辑">
    </search> -->
    <x-header :left-options="{showBack: false}">
      网易云音乐
    </x-header>
    <tab :line-width="2" :custom-bar-width="getBarWidth">
      <tab-item selected>
        <router-link tag="div" :to="{name: 'music'}">
          发现音乐
        </router-link>
      </tab-item>
      <tab-item>
        <router-link tag="div" :to="{name: 'station'}">
          主播电台
        </router-link>
      </tab-item>
    </tab>
    <router-view class="main-container" />
  </div>
</template>

<script>
import { XHeader, Tab, TabItem } from "vux";
export default {
  name: "find",
  data() {
    return {
      getBarWidth: function(index) {
        return 60 + "px";
      }
    };
  },
  components: {
    XHeader,
    Tab,
    TabItem
  },
  computed: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
