<template>
  <div class="u-height songapp">
    <div class="m-song_newfst" v-if="song.songs&&song.songs.length>0">
      <div class="m-song-bg" :style="songBgStyle"></div>
      <span class="m-logo "></span>
      <div class="m-song-wrap ">
        <div class="m-song-disc ">
          <div class="m-song-turn">
            <div ref="turn" class="m-song-rollwrap" :style="styleTransform">
              <!-- 'z-pause':isPause -->
              <div ref="roll" class="m-song-img" :class="imgStyle"><img class="u-img " :src="imgUrl"></div>
            </div>
            <div class="m-song-lgour " :style="styleTransform">
              <div ref="light" class="m-song-light" :class="imgStyle"></div>
            </div>
          </div>
          <span v-if="isPause" class="m-song-plybtn" @click="startPlay"></span>
        </div>
        <div class="m-song-clickarea" @click="startPlay"></div>
      </div>
      <div class="m-song-info ">
        <h2 class="m-song-h2 ">
          <span class="m-song-sname ">{{ song.songs[0].name }}{{zhuanji}}</span>
          <span class="m-song-gap ">-</span>
          <b class="m-song-autr ">{{ songAutr }}</b>
        </h2>
        <div ref="lrcBox" class="m-song-lrc f-pr ">
          <div class="m-song-scroll" :style="{height:scrollData.outerHeight+'px'}">
            <div ref="lrc" class="m-song-iner" :style="lrcScrollTop">
              <p class="m-song-lritem j-lritem" v-for="(item,index) in song.lyric_lines" :style="{color:curIndex==index?'#fff':''}">
                {{ item.lyric }}
              </p>
              <p class="m-song-lremp">歌词加载中...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="nodata" class="m-song-notexit">
      <header class="m-topdown">
        <div class="m-topdown-fl"></div>
        <div class="m-topdown-fc">
          <h1 class="m-topdown-h1">网易云音乐</h1>
          <p class="m-topdown-p">千万曲库，首首CD音质</p>
        </div>
      </header>
      <section class="m-notexit">
        <h3 class="m-notexit-h3">非常遗憾</h3>
        <p class="m-notexit-p">您所查看的内容已被删除</p>
      </section>
    </div>
    <section v-else class="m-notexit">
      <p class="m-notexit-p">
        <inline-loading></inline-loading>拼命加载中....</p>
    </section>
  </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { ViewBox, InlineLoading } from "vux";
import player from "@/utils/player";
import env from "@/utils/env";
export default {
  metaInfo() {
    return {
      title: this.title,
      meta: [
        {keywords: this.keywords},  
        {description: this.keywords}
      ]
    };
  },
  data() {
    return {
      lrcScrollTop: "",
      styleTransform: "",
      nodata: false,
      scrollData: {
        minHeight: 32,
        outerHeight: 88,
        paddingBottom: 8,
        scrollIndex: 1,
        visibleLyricCount: 3
      }
    };
  },
  components: {
    ViewBox,
    InlineLoading
  },
  watch: {},
  computed: {
    ...mapGetters(["isPause", "Audio", "curIndex", "transfrom"]),
    ...mapGetters({
      // 映射 `this.song` 为 `store.getters.propo`
      song: "props"
    }),
    songBgStyle() {
      return this.song.songs && this.song.songs.length > 0
        ? 'background-image: url("http://music.163.com/api/img/blur/' +
            this.song.songs[0].al.pic_str +
            '"); opacity: 1;'
        : "";
    },
    imgUrl() {
      return this.song.songs && this.song.songs.length > 0
        ? this.song.songs[0].al.picUrl +
            "?imageView&amp;thumbnail=1080y1080&amp;quality=75&amp;tostatic=0&amp;type=webp"
        : "";
    },
    songAutr() {
      var str = "";
      for (var item of this.song.songs[0].ar) {
        str += "/" + item.name;
      }

      return str.slice(1, str.length);
    },
    imgStyle() {
      return env.isIos()
        ? !this.isPause ? "a-circling" : ""
        : !this.isPause ? "a-circling" : "a-circling z-pause";
    },
    zhuanji() {
      return this.song.songs[0].alia && this.song.songs[0].alia.length > 0
        ? "(" + this.song.songs[0].alia.join(",") + ")"
        : "";
    },
    title() {
      if (!this.song.songs || this.song.songs.length == 0) {
        return "网易云音乐";
      }
      return (
        this.song.songs[0].name +
        " - " +
        (this.zhuanji ? this.zhuanji + "," : "") +
        this.songAutr
      );
    },
    keywords() {
      if (!this.song.songs || this.song.songs.length == 0) {
        return "网易云音乐";
      }
      return (
        this.song.songs[0].name +
        "," +
        (this.zhuanji ? this.zhuanji + "," : "") +
        this.songAutr.split("/").join(",")
      );
    }
  },
  methods: {
    ...mapActions(["setPause", "setSource", "setProps", "setStates", "doPlay"]),
    getSongDetail() {
      var id = this.$route.query.id;
      if (!id) {
        this.nodata = true;
        return;
      }
      this.$http
        .all([
          this.$musicApi.getSong(this, { ids: id }),
          this.$musicApi.getLyric(this, { id: id })
        ])
        .then(
          this.$http.spread(
            function(res1, res2) {
              if (res1.data.songs.length == 0) {
                this.nodata = true;
                return;
              }
              if (res2.data.uncollected) {
                //歌词未收录
              }
              res1.data["lyricData"] = res2.data;
              this.setProps(res1.data);
              this.initAudio();
            }.bind(this)
          )
        )
        .catch(err => {
          this.setProps(this.$localData.song);
          this.initAudio();
        });
    },
    ontimeupdate(e) {
      !this.scrollData.heights && (this.scrollData = player.initHeight(this));
      var currentTime = e.currentTarget.currentTime;
      var curIndex = player.findLyricByTime(
        currentTime,
        this.song.lyric_lines,
        this.curIndex
      );
      this.setStates({
        curIndex: curIndex
      });
      curIndex = curIndex - 1 < 0 ? 0 : curIndex - 1;
      var c = player.fetchScrollDist(curIndex, this.scrollData);
      var l = {};
      l[this.transfrom] = "translateY(-" + c + "px)";
      this.lrcScrollTop = JSON.stringify(l).replace(/\"|{|}/g, "");
    },
    onended() {
      console.log("播放完毕");
      this.setPause(true)

      this.setStates({
        curIndex: 0
      });
      var l = {};
      l[this.transfrom] = "translateY(-" + 0 + "px)";
      this.lrcScrollTop = JSON.stringify(l).replace(/\"|{|}/g, "");
    },
    toplay(){
      this.setPause(false)
    },
    initAudio() {
      this.Audio.onended = this.onended;
      this.Audio.onplay = this.toplay;
      this.Audio.ontimeupdate = this.ontimeupdate;
    },
    setPauseStyle() {
      var e = this.transfrom,
        a = window.getComputedStyle(this.$refs.roll)[e],
        b = window.getComputedStyle(this.$refs.turn)[e];
      if (env.isIos()) {
        var r = "none" === b ? a : a.concat(" ", b),
          i = {};
        i[e] = r;
        this.styleTransform = JSON.stringify(i).replace(/\"|{|}/g, "");
      }
    },
    startPlay(e) {
      e && e.stopPropagation();
      this.Audio.paused
        ? (this.Audio.play(), this.setPause(false))
        : (this.Audio.pause(), this.setPause(true), this.setPauseStyle());
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getSongDetail();
    });
  },
  updated: function() {
    this.$nextTick(function() {
      //this.playMusic();
      //console.log("sdsds");
    });
  }
};
</script>

<style lang="less">
@import "../../assets/less/song.less";
.songapp + .weui-tabbar {
    display: none !important;
  
}
</style>
