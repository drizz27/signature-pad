const { loadNuxt } = require('nuxt')
const express = require('express')

const isDev = process.env.NODE_ENV !== 'production'
const app = express()

async function start() {
  const nuxt = await loadNuxt(isDev ? 'dev' : 'start')
  app.use(nuxt.render)
  const port = process.env.PORT || 3000
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
  })
}

start()
