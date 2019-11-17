const path = require('path')
const express = require('express')
const httpProxy = require('http-proxy')

const CONSTANTS = {
  PORTAL_PORT: process.env.PORTAL_PORT || '3000',
  API_V1_BASE: process.env.API_V1_BASE || 'http://localhost:3003/apis/v1/'
}

const app = express()

const proxyCreatorRoute = (appRoute, target) => {
  const proxy = httpProxy.createProxyServer({
    proxyTimeout: 10000,
  })
  appRoute.all('/*', (req, res) => {
    proxy.web(req, res, {
      target
    })
  })
  return appRoute
}
app.use('/apis', proxyCreatorRoute(express.Router(), CONSTANTS.API_V1_BASE))

app.use('/', express.static(__dirname))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(CONSTANTS.PORTAL_PORT, (err) => {
  console.log(err || 'No Error', `Server started at ${CONSTANTS.PORTAL_PORT}`)
})