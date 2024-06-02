import { createResolver } from 'nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },

  colorMode: {
    preference: 'light',
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    'nuxt-og-image',
    'nuxt-auth-utils',
    '@nuxt/image',
    '@nuxtjs/mdc',
    'nuxt-module-feed',
    '@nuxtjs/sitemap',
  ],

  runtimeConfig: {
    twitterAPIKey: process.env.TWITTER_API_KEY,
    twitterAPISecret: process.env.TWITTER_API_SECRET,
    twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
    twitterAccessSecret: process.env.TWITTER_ACCESS_SECRET,

    adminPassword: process.env.ADMIN_PASSWORD,
    databaseDir: resolve('./server/database'),
    tursoDBURL: process.env.TURSO_DB_URL,
    tursoDBToken: process.env.TURSO_DB_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  },

  sitemap: {
    sources: ['/api/sitemap'],
  },

  feed: {
    sources: [
      {
        path: '/feed.xml',
        type: 'rss2',
        cacheTime: 60 * 15,
      },
      {
        path: '/rss.xml',
        type: 'rss2',
        cacheTime: 60 * 15,
      },
    ],
  },

  mdc: {
    components: {
      prose: false,
    },

    highlight: {
      theme: {
        default: 'vitesse-light',
        dark: 'material-theme-palenight',
      },
    },
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
        commaDangle: 'never',
      },
    },
  },
})
