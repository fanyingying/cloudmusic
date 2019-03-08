export default [
  {
    name: 'music',
    path: '',
    alias: 'music',
    component: resolve => require.ensure([], () => resolve(require('@/views/find/music.vue')), 'music')
  },
  {
    name: 'station',
    path: 'station',
    component: resolve => require.ensure([], () => resolve(require('@/views/find/station.vue')), 'station')
  }
  // {
  //   path: '',
  //   name: 'BlogList',
  //   alias: 'BlogList',
  //   component: resolve => require(['@/views/BlogList.vue'], resolve)
  // },
  // {
  //   path: 'BlogDetail/:number',
  //   name: 'BlogDetail',
  //   component: resolve => require(['@/views/BlogDetail.vue'], resolve)
  // }
]
