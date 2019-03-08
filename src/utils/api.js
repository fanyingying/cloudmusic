
// api请求
// vue.$qs.stringify(params)
// https://binaryify.github.io/NeteaseCloudMusicApi/#/

const base = '/api'
const isLocalData = true
//const isLocalData = false

const request = (vue, params, url) => {
  params = params || []
  return vue.$http
    .get(base + url + '?' + vue.$qs.stringify(params))
}
module.exports = {
  // banner
  getBanner: (vue, params) => {
    return isLocalData?vue.$localData.banners:request(vue, params, '/banner')
  },
  // 推荐歌单
  getPersonalized: (vue, params) => {
    return isLocalData?vue.$localData.personalized:request(vue, params, '/personalized')
  },
  // 独家放送
  getPrivatecontent: (vue, params) => {
    return isLocalData?vue.$localData.privatecontent:request(vue, params, '/personalized/privatecontent')
  },
  // 最新音乐
  getNewsong: (vue, params) => {
    return isLocalData?vue.$localData.newsong:request(vue, params, '/personalized/newsong')
  },
  // 根据id获取歌曲信息
  getSong: (vue, params) => {
    return request(vue, params, '/song/detail')
  },
  // 根据id获取歌词
  getLyric: (vue, params) => {
    return request(vue, params, '/lyric')
  },
  // 根据id获取音乐url
  getSongUrl: (vue, params) => {
    return request(vue, params, '/music/url')
  },
  get: (vue, params) => {
    return request(vue, params, '/')
  }

}
