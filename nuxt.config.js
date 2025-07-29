require('dotenv').config() // ✅ Load .env before config

import colors from 'vuetify/es5/util/colors'

export default {
  target: 'static', // ✅ For Vercel static hosting
  ssr: false,       // ✅ SPA mode (no server-side rendering)

  generate: {
    fallback: true // ✅ Create 404.html for client-side routing on static hosting
  },

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
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxt/http'
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://signature-pad-ten.vercel.app' // ✅ Default to production domain if env is missing
  },

auth: {
  strategies: {
    github: {
      scheme: 'oauth2',
      endpoints: {
        authorization: 'https://github.com/login/oauth/authorize',
        token: 'https://github.com/login/oauth/access_token',
        userInfo: 'https://api.github.com/user'
      },
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectUri: process.env.GITHUB_REDIRECT_URI,
      responseType: 'code',
      grantType: 'authorization_code',
      scope: ['read:user', 'user:email'],
      codeChallengeMethod: 'S256',   // ✅ important!
      pkce: true                     // ✅ important!
    },
    discord: {
      scheme: 'oauth2',
      endpoints: {
        authorization: 'https://discord.com/api/oauth2/authorize',
        token: 'https://discord.com/api/oauth2/token',
        userInfo: 'https://discord.com/api/users/@me'
      },
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      redirectUri: process.env.DISCORD_REDIRECT_URI,
      responseType: 'code',
      grantType: 'authorization_code',
      scope: ['identify', 'email'],
      codeChallengeMethod: 'S256',   // ✅ important!
      pkce: true                     // ✅ important!
    }
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
