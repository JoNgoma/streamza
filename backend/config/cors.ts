import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin:  ['http://127.0.0.1:5500'],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE'],
  headers: true,
  exposeHeaders: [],
  credentials: false,
  maxAge: 90,
})

export default corsConfig
