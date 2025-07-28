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
    '@nuxtjs/auth-next',
    '@nuxtjs/dotenv'
    
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },

  // Auth module configuration//
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
      scope: ['read:user', 'user:email'],
      codeChallengeMethod: 'S256',
      responseType: 'code',
      grantType: 'authorization_code',
      redirectUri: process.env.REDIRECT_URI || 'https://signature-pad-tau.vercel.app/auth/callback'
    },
    discord: {
      scheme: 'oauth2',
      endpoints: {
        authorization: 'https://discord.com/oauth2/authorize',
        token: 'https://discord.com/api/oauth2/token',
        userInfo: 'https://discord.com/api/users/@me'
      },
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: ['identify', 'email'],
      responseType: 'code',
      grantType: 'authorization_code',
      redirectUri: process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback'
    }
  },
  redirect: {
    login: '/auth/signin',
    logout: '/auth/signin',
    callback: '/auth/callback',
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
