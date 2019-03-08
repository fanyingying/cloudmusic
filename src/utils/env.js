
 var r = '',
   n = ''
 typeof window !== 'undefined' && (r = window.navigator.userAgent,
        n = window.document.cookie || '')
 var i = 0,
   o = 1,
   a = 2,
   s = 3,
   u = 0,
   c = 10,
   l = 11,
   f = 20,
   d = 30,
   h = 31,
   p = /ipad/gi,
   U = /iphone|ipod|ipad|ios/gi,
   _ = /Android/gi,
   g = /windows\s+phone/gi,
   v = /IPadQQ/gi,
   m = /mobile|mobi|wap|simulator|iphone|android/gi,
   y = /SINA_ROBOT|SINA_WEIBO/gi,
   P = /Weibo|MicroMessenger|YDDict|youdao_dict|QQ(?!Browser)|RenRen|Douban|YiXin|TXMicroBlog|NewsApp/i,
   w = /QQBrowser/gi,
   E = /Android\s+([\d\.]+);/i,
   Y = /Windows\s+Phone\s+([\d+\.]+);/i,
   k = /.*Windows\sNT\s(.*)\;/i,
   S = /OS\s+([\d+_]+)/i,
   b = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     return e == '' ? i : D(e) ? s : isIos(e) ? o : M(e) ? a : i
   },
   A = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
       t = b(e)
     switch (t) {
       case o:
         return 'ios'
       case a:
         return 'android'
       case s:
         return 'wp'
       default:
         return 'other'
     }
   },
   C = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
       t = j(e)
     return t != null ? t : (t = e.match(S),
            t != null ? t[1].replace(/_/g, '.') : (t = N(e),
            t != null ? t : ''))
   },
   x = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     return e == '' ? u : D(e) ? B(e) ? h : d : isIos(e) ? I(e) ? l : c : M(e) ? f : u
   },
   T = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
       t = x(e)
     switch (t) {
       case c:
         return 'iphone'
       case l:
         return 'ipad'
       case f:
         return 'android'
       case d:
         return 'wp'
       case h:
         return 'uwp'
       default:
         return 'other'
     }
   },
   R = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     return I(e) ? 'pad' : 'phone'
   },

   I = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = e.match(p)
     return t != null
   },
   O = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
       t = e.match(S)
     return t != null ? parseInt(t[1].split('_')[0], 10) : -1
   },
   M = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = e.match(_),
       n = e.match(g)
     return t != null && n == null
   },
   N = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
       t = e.match(E)
     return t != null ? t[1] : null
   },
   L = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     return M(e) && /\bChrome\/\d/.test(e) && !/\bVersion\/\d/.test(e)
   },
   D = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = e.match(g)
     return t != null
   },
   j = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
       t = e.match(Y)
     return t != null ? t[1] : null
   },
   B = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (D(e)) {
       var t = j(e)
       if (t != null) {
         try {
           var n = parseFloat(t, 10)
           if (n != null && n >= 10) { return !0 }
         } catch (e) {
           return !1
         }
       }
     }
     return !1
   },
   q = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r,
       t = e.match(k)
     return t != null ? t[1] : null
   },
   H = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = q(e)
     if (t != null) {
       try {
         var n = parseFloat(t, 10)
         if (n != null && n >= 10) { return !0 }
       } catch (e) {
         return !1
       }
     }
     return !1
   },
   F = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = e.match(m)
     return t != null
   },
   G = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     return e.indexOf('MSIE 6.0')
   },
   z = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = e.matcher(y)
     return t != null
   },
   Q = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = X(e)
     return 'QQ'.toLowerCase() == t || 'Weibo'.toLowerCase() == t || 'MicroMessenger'.toLowerCase() == t
   },
   W = function (e) {
     return e.match(v) != null
   },
   X = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
     if (e == '') { return !1 }
     var t = e.match(P),
       n = e.match(w)
     return t != null ? t[0].toLowerCase() : n != null ? n[0].toLowerCase() : ''
   },
   J = {
     Weibo: 'sina',
     MicroMessenger: 'wx',
     YDDict: 'youdaodict',
     youdao_dict: 'youdaodict',
     YiXin: 'yx',
     TXMicroBlog: 'tencent',
     NewsApp: 'neteasenews',
     QQ: 'qq',
     RenRen: 'renren',
     Douban: 'douban'
   },
   K = function () {
     var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
       t = ''
     for (var r in J) {
       if (r.toLowerCase() == e) {
         t = J[r]
         break
       }
     }
     return t
   },
   Z = /appver/i,
   $ = /NeteaseMusic\/([\d\.]+)?/i,
   ee = function () {
     return r.match($) != null || n.match(Z) != null
   },
   te = /appver=([\d\.]+)?/i,
   re = function () {
     var e = r.match($) || n.match(te),
       t = e != null ? e[1] : ''
     return t
   }
 const isIos = function () {
   var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : r
   if (e == '') { return !1 }
   var t = e.match(U),
     n = e.match(g)
   return t != null && n == null
 }
 const EnvInit = function (e) {
   var t = e.userAgent,
     i = e.Cookie
   r = t || '',
            n = i || ''
 }

 const env = {
   EnvInit: EnvInit,
   getPlatform: b,
   getPlatform2Str: A,
   getOSVersionStr: C,
   getDevicePro: x,
   getDevicePro2Str: T,
   getDevice: R,
   isIos: isIos,
   isPad: I,
   getIosLargeVersion: O,
   isAndroid: M,
   isAndroidChrome: L,
   getAndroidVersion: N,
   isWP: D,
   getWPVersion: j,
   isWP10: B,
   getWinVersion: q,
   isWin10: H,
   isMobile: F,
   isIe6: G,
   isSinaRobot: z,
   isUnsupportedClient: Q,
   isIpadQQ: W,
   getClient: X,
   isInNEMapp: ee,
   getAppVersion: re,
   fetchLogByClient: K
 }

 export default env
