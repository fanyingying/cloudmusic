var scrollData = {
  minHeight: 32,
  outerHeight: 88,
  paddingBottom: 8,
  scrollIndex: 1,
  visibleLyricCount: 3
}

// 初始化歌词显示部分的高度
const initHeight = (state) => {
  console.log('监听时间')

  var i = document.querySelectorAll('.j-lritem')
  return i && i.length !== 0 ? fetchOtherData({
    lyitems: i,
    // lyric: state.song.lyric_lines,
    hasTrans: state.song.hasTrans,
    scrollable: state.song.scrollable
  }) : scrollData
}
const fetchOtherData = (t) => {
  t = t || {}
  var r = getLycItemHeight(t.lyitems)
  var a = resetLrcscrollHeight({
    hasTrans: t.hasTrans,
    scrollable: t.scrollable,
    minHeight: r.minHeight,
    paddingBottom: r.paddingBottom,
    total: t.total || 3
  })
  return Object.assign({}, r, a)
}

const getLycItemHeight = (lyitems) => {
  let styleStr = window.getComputedStyle(lyitems[0], null)
  let defaultVal = {
    paddingBottom: parseInt(styleStr.paddingBottom),
    minHeight: 999999,
    heights: []
  }
  for (let n = 0; n < lyitems.length; n++) {
    var height = lyitems[n].offsetHeight
    if (height < defaultVal.minHeight && height >= scrollData.minHeight) {
      defaultVal.minHeight = height
    } else {
      defaultVal.minHeight = scrollData.minHeight
    }
    defaultVal.heights.push(height)
  }
  return defaultVal
}

const resetLrcscrollHeight = (e) => {
  var t = e.hasTrans
  var r = e.scrollable
  var minHeight = e.minHeight
  var paddingBottom = e.paddingBottom
  var total = e.total
  total = total || 3
  var width = document.documentElement.clientWidth
  var height = document.documentElement.clientHeight
  var u = width / height
  var c = 0.1
  u <= 0.67 && t === !1 ? c = 0.16 : u <= 0.67 && t === !0 ? c = 0.18 : u > 0.7 && t === !1 ? c = 0.06 : u > 0.7 && t === !0 ? c = 0.08 : t === !0 && (c = 0.12)
  u > 0.65 && r === !1 && (c = 2 * c / 3)
  console.log('u:' + u)
  console.log('c:' + c)
  var f = Math.floor(height * c / minHeight)
  if (f >= total) {
    f = total
    if (r === !1) {
      f = total - 1
      f = f > 0 ? f : 1
    }
  }
  var d = f === 0 ? 0 : minHeight * f - paddingBottom
  var h = 1
  t ? h = 0 : f < 3 && (h = 0)
  var p = f
  return {
    outerHeight: d,
    visibleLyricCount: p,
    scrollIndex: h
  }

//   var t = e.trans
//   var r = e.scrollable
//   var n = e.minHeight
//   var i = e.paddingBottom
//   var o = e.total
//   o = o || 3
//   var a = document.documentElement.clientHeight
//   var s = document.documentElement.clientWidth
//   var u = s / a
//   var c = 0.1

//   u <= 0.67 && t === !1 ? c = 0.16 : u <= 0.67 && t === !0 ? c = 0.18 : u > 0.7 && t === !1 ? c = 0.06 : u > 0.7 && t === !0 ? c = 0.08 : t === !0 && (c = 0.12)
//   u > 0.65 && r === !1 && (c = 2 * c / 3)
//   var l = a * c
//   var f = Math.floor(l / n)
//   f >= o && (f = o, r === !1 && (f = o - 1, f = f > 0 ? f : 1))
//   var d = void 0
//   d = f === 0 ? 0 : n * f - i
//   var h = 1
//   t ? h = 0 : f < 3 && (h = 0)
//   var p = f
//   return {
//     outerHeight: d,
//     visibleLyricCount: p,
//     scrollIndex: h
//   }
}

// 渲染歌词
const renderLyric = (lrcArr, state) => {
  state.refs.lrcBox.innerHTML = ''
  var scroll = document.createElement('div')
  scroll.className = 'm-song-scroll'
  var iner = document.createElement('div')
  iner.className = 'm-song-iner'
  scroll.appendChild(iner)
  for (const item of lrcArr) {
    var p = document.createElement('p')
    p.className = 'm-song-lritem j-lritem'
    if (item === state.curIndex) {
      p.style = 'color: "#fff"'
    }
    p.innerHTML = item.lyric ? item.lyric : 'nbsp;'
    iner.appendChild(p)
  }
  state.refs.lrcBox.appendChild(scroll)
}

/**
  根据时间定位歌词index
  currentTime:当前播放的时间
  lyricLines:歌词数组
  oldindex:原来的index
 */
const findLyricByTime = (currentTime, lyricLines, oldindex) => {
  oldindex = oldindex || 0
  let i = oldindex
  for (let k = oldindex; k < lyricLines.length; k++) {
    var item = lyricLines[k]
    if (item.time <= currentTime && k > oldindex) {
      i = k
      break
    }
  }
  return i
}

// 获取歌词滚动距离
const fetchScrollDist = (s, t) => {
  for (var e = void 0 !== s ? s : 0, r = 0, n = t.heights, i = 0; i < e; i++) {
  // for (var e = void 0 !== s ? s : 0, r = 0, n = t, i = 0; i < e; i++) {
    r += n[i]
    // r += t.minHeight
  }
  return r
}
/**
处理歌词数据格式
 */
const parseLyric = (lrc) => {
  var lyrics = lrc.split('\n')
  lyrics.pop()
  var lrcObj = {}
  var lrcArr = []
  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i])
    var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
    var timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    var clause = lyric.replace(timeReg, '')

    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
      if (clause === '') {
        continue
      }
      var t = timeRegExpArr[k]
      var min = Number(String(t.match(/\[\d*/i)).slice(1))
      var sec = Number(String(t.match(/:\d*\.\d*/i)).slice(1))
      var time = min * 60 + sec
      lrcObj[time] = {
        lyric: clause || '',
        tag: t,
        time: time
      }
    }
  }
  for (const item in lrcObj) {
    lrcArr.push(lrcObj[item])
  }
  lrcArr.sort((a, b) => {
    return a.time - b.time
  })
  return lrcArr
}

export default {
  findLyricByTime: findLyricByTime,
  fetchScrollDist: fetchScrollDist,
  parseLyric: parseLyric,
  initHeight: initHeight,
  renderLyric: renderLyric
}
