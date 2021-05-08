export default {

  target: 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sisbi',
    lang: 'ru',
    meta: [
      { lang: 'ru' },
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { httpEquiv: 'X-UA-Compatible', content: 'IE=Edge' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/main.css'
  ],

  loading: {
    color: '#F05F3F'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/elements',
    '@/plugins/global-components',
    '@/plugins/modal',
    '@/plugins/moment',
    '@/plugins/resize'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router-extras',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    // 'nuxt-sass-resources-loader',
    '@nuxtjs/universal-storage',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  storage: {
    vuex: {
      namespace: 'storage'
    },
    localStorage: {
      prefix: ''
    },
    initialState: { testParam: false }
  },

  // sassResources: [
  //   '~assets/constants.sass',
  //   '~assets/element-variables.scss'
  // ],

  styleResources: {
      scss: [
        '~assets/element-variables.scss',
      ],
      sass: [
          '~/assets/constants.sass',
      ]
  },

  
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },

  proxy: {
    '/api/v1': {
      target: 'http://193.7.217.242:5000',
      changeOrigin: true
    },
    '/videos': {
      target: 'http://193.7.217.242:5000',
      changeOrigin: true
    }
  },

  router: {
    middleware: ['auth']
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
