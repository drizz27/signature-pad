const { Nuxt } = require('nuxt-start')
const express = require('express')

const config = require('../nuxt.config.js')
config.dev = false

const app = express()
const nuxt = new Nuxt(config)

app.use(async (req, res) => {
  await nuxt.ready()
  nuxt.render(req, res)
})

module.exports = app
