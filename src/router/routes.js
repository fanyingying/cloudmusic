import findRoutes from './find-routes'
/**
 * 路由表配置
 */
export default [
  // {
  //   path: '/example',
  //   component: resolve => require.ensure([], () => resolve(require('@/views/examples/ExampleList.vue')), 'ExampleList'),
  //   children: exampleRoutes
  // },
  { path: '/', redirect: '/find' },
  {
    path: '/find',
    component: resolve => require.ensure([], () => resolve(require('@/views/find/index.vue')), 'find'),
    children: findRoutes,
    alias: '/find'
  },
  {
    name: 'personal',
    path: '/personal/',
    component: resolve => require.ensure([], () => resolve(require('@/views/personal/index.vue')), 'personal')
  },
  {
    name: 'song',
    path: '/song/',
    component: resolve => require.ensure([], () => resolve(require('@/views/song/index.vue')), 'personal')
  }
  // { path: '*', component: NotFoundComponent }
]
