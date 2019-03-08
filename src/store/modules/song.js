import { makeAction } from '../util'
import player from '@/utils/player'
import env from '@/utils/env'

const SET_PAUSE = 'SET_PAUSE'
const SET_SOURCE = 'SET_SOURCE'
const SET_PROPS = 'SET_PROPS'
const SET_STATES = 'SET_STATES'
const DO_PLAY = 'DO_PLAY'
const state = {
  Audio: new Audio(),
  isPause: env.isIos(),
  curIndex: 0,
  props: {},
  refs: {},
  transfrom: (function (e) {
    var t = ['transform', 'webkitTransform', 'msTransform', 'MozTransform']
    for (var n in t) {
      if (void 0 !== e.style[t[n]]) { return t[n] }
    }
    return t[1]
  }(document.createElement('div')))
}

const mutations = {
  [SET_PAUSE] (state, pause) {
    state.isPause = pause
  },
  [SET_SOURCE] (state, src) {
    state.Audio.src = src
    state.Audio.autoplay = true
    // state.Audio.onended = onended
    // state.Audio.ontimeupdate = ontimeupdate
  },
  [SET_PROPS] (state, data) {
    state.props = data
    state.props['lyric_lines'] = player.parseLyric(data['lyricData'].lrc.lyric)
    // TODO:歌词是否能够滚动
    state.props['scrollable'] = true
    state.props['hasTrans'] = true
    state.Audio.src = 'http://music.163.com/song/media/outer/url?id=' +
              data.songs[0].id +
              '.mp3'
    state.Audio.autoplay = true
    // state.Audio.loadstart = loadstart
    // state.Audio.onended = onended
    // state.Audio.ontimeupdate = ontimeupdate
  },
  [SET_STATES] (state, states) {
    states != null && typeof states === 'object' ? Object.assign(state, states) : void 0
  },
  [DO_PLAY] (state) {
    // player.renderLyric(state.props['lyric_lines'], state)
    // state.Audio.autoplay &&
    state.Audio.autoplay && state.Audio.play()
    // alert(state.Audio.autoplay)
  }

}
const actions = {
  setPause: makeAction(SET_PAUSE),
  setSource: makeAction(SET_SOURCE),
  setProps: makeAction(SET_PROPS),
  setStates: makeAction(SET_STATES),
  doPlay: makeAction(DO_PLAY)
}

const getters = {
  isPause (state) {
    return state.isPause
  },
  Audio (state) {
    return state.Audio
  },
  props (state) {
    return state.props
  },
  curIndex (state) {
    return state.curIndex
  },
  transfrom (state) {
    return state.transfrom
  }
}
export default {
  state,
  mutations,
  getters,
  actions
}
