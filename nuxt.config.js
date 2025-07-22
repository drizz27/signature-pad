import colors from 'vuetify/es5/util/colors'

export default {

  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - nuxt2-signature-app',
    title: 'nuxt2-signature-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [],

  plugins: [
    { src: '~/plugins/vue-signature-pad.js', mode: 'client' }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios: {
    baseURL: 'http://localhost:3000'
  },

  // Auth module configuration//
  auth: {
    strategies: {
      // --- github Strategy ---//
      github: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://github.com/login/oauth/authorize',
          token: 'https://github.com/login/oauth/access_token',
          userInfo: 'https://api.github.com/user'
        },
        clientId: 'Ov23ct5BT1GU7CLl5NiZ',
        clientSecret: '94e759d64fc40fdb6330b745dc9b23380e05e19d',
        scope: ['read:user', 'user:email'],
        codeChallengeMethod: '',
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri: 'http://localhost:3000/auth/github/callback'
      },
      // --- Discord Strategy ---//
      discord: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://discord.com/oauth2/authorize',
          token: 'https://discord.com/api/oauth2/token',
          userInfo: 'https://discord.com/api/users/@me'
        },

        clientId: '1397205938867540018',
        clientSecret: 'u4K312wYXvVLALPIxWAoTLA6EZG-xJ5y',
        scope: ['identify', 'email'],
        responseType: 'code',
        grantType: 'authorization_code',
        redirectUri: 'http://localhost:3000/auth/discord/callback' // Dapat tumugma sa Redirect URI sa Discord Developer Portal
      }
    },
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      callback: '/auth/github/callback',
      home: '/signature'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {}
}
