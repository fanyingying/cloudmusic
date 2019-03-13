<template>
  <div>
    <swiper height="146px" dots-position="center" :loop="true" :auto="true">
      <swiper-item class="swiper-demo-img" v-for="(item, index) in posterList" :key="index">
        <div class="banner-img" :style="'background-image: url('+item.imageUrl+');'">
          <div :class="'tip '+item.titleColor">{{ item.typeTitle}}</div>
        </div>

      </swiper-item>
    </swiper>
    <flexbox class="box-menu vux-1px-b" justify="center">
      <flexbox-item>
        <router-link tag="div" :to="{name: 'personal'}">
          <div class="menu-item">
            <i class="iconfont icon-radio"></i>
          </div>
          <div class="text">私人FM</div>
        </router-link>

      </flexbox-item>
      <flexbox-item>
        <router-link tag="div" :to="{name: 'personal'}">
          <div class="menu-item">
            <i class="iconfont icon-rili"></i>
          </div>
          <div class="text">每日推荐</div>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link tag="div" :to="{name: 'personal'}">
          <div class="menu-item">
            <i class="iconfont icon-playlist"></i>
          </div>
          <div class="text">歌单</div>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link tag="div" :to="{name: 'personal'}">
          <div class="menu-item">
            <i class="iconfont icon-rank"></i>
          </div>
          <div class="text">排行榜</div>
        </router-link>
      </flexbox-item>
    </flexbox>
    <h2 class="remd_tl">
      推荐歌单
      <x-icon type="ios-arrow-right"></x-icon>
    </h2>
    <div class="remd_songs">
      <div class="remd_ul">
        <a class="remd_li li3" href="/m/playlist?id=2139491961" v-for="item in personalized">
          <div class="remd_img">
            <img class="banner-img" :src="item.picUrl">
            <span class="u-earp remd_lnum">{{ (item.playCount/1e4).toFixed(1) }}万</span>
          </div>
          <p class="remd_text">{{ item.name }}</p>
        </a>
      </div>
    </div>
    <h2 class="remd_tl">
      独家放送
    </h2>
    <div class="remd_songs privatecontent">
      <div class="remd_ul">
        <a :class="{'remd_li li2': index<2,'remd_li li1':index==2 }" href="/m/playlist?id=2139491961" v-for="(item,index) in privatecontent" :key="index">
          <div class="remd_img">
            <img class="banner-img" :src="index<2?item.sPicUrl:item.picUrl">
          </div>
          <p class="remd_text">{{ item.name }}</p>
        </a>
      </div>
    </div>
    <h2 class="remd_tl">
      最新音乐
    </h2>
    <div class="remd_newsg">
      <div class="m-sglst">
        <a class="m-sgitem vux-1px-b" :href="'#/song?id='+item.id" v-for="(item,index) in newsong">
          <div class="sgfr f-bd f-bd-btm">
            <div class="sgchfl">
              <div class="f-thide sgtl">
               {{ item.name }}
               <span class="sgalia" v-if="item.song.alias.length>0">({{ item.song.alias[0] }})</span>
              </div>
              <div class="f-thide sginfo">
                {{ item.song.artists[0].name }}-{{ item.name }}
              </div>
            </div>
            <div class="sgchfr">
              <span class="u-hmsprt sgchply"></span>
            </div>
          </div>
        </a>
      </div>
    </div>

  </div>
</template> 
<script>
import { Swiper, Flexbox, FlexboxItem, SwiperItem, Toast } from "vux"
export default {
  data() {
    return {
      posterList: [],
      personalized: [],
      privatecontent: [],
      newsong: []
    };
  },
  components: {
    Swiper,
    Flexbox,
    FlexboxItem,
    SwiperItem,
    Toast
  },
  computed: {},
  methods: {
    getData() {
      var _this = this
      this.$http
        .all([
          this.$musicApi.getBanner(this),
          this.$musicApi.getPersonalized(this, { limit: 6 })
        ])
        .then(
          this.$http.spread(function(res1, res2) {
            // 两个请求现在都执行完成
            this.posterList = res1.data.banners;
            this.personalized = res2.data.result.slice(0,6);
          }.bind(this))
        )
        .catch(err => {
           this.$msgbox('温馨提示','无法请求数据，请查看网络')
        });
      this.$http
        .all([
          this.$musicApi.getPrivatecontent(this),
          this.$musicApi.getNewsong(this, { limit: 10 })
        ])
        .then(
          this.$http.spread(function(res1, res2) {
            // 两个请求现在都执行完成
            this.privatecontent = res1.data.result;
            this.newsong = res2.data.result;
          }.bind(this))
        )
        .catch(err => {
            this.$msgbox('温馨提示','无法请求数据，请查看网络')
        });
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getData();
    });
  }
};
</script>
<style scoped>

</style>
