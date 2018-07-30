module.exports = {
  base: '/RealmReactNative/',
  title: 'RealmReactNative',
  description: 'realm react native 中文文档',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    repo: 'youngjuning/RealmReactNative',
    repoLabel: 'GitHub',
    docsRepo: 'youngjuning/RealmReactNative',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    nav: [
      { text: 'Getting Started', link: '/' },
      { text: 'Introduce', link: '/introduce-realm-react-native/'},
    ], // 导航栏
    sidebar: 'auto', // 自动生成侧栏
    lastUpdated: 'Last Updated', // 最后更新时间
  },
  markdown: {
    lineNumbers: true
  }
}
