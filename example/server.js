const express =require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')


const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/build/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended:true}))

const port = process.env.PORT || 8088
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

/* 添加路由 */
const router = express.Router()
router.get('/simple/get', function(req,res){
  res.json({
    msg: 'hello world'
  })
})

router.get('/base/get', function(req, res){
  // res.json(req.query)
  res.send(req.query)
})

router.post('/base/post', function(req, res){
  res.json(req.body)
})

router.post('/base/buffer', function(req, res){
  let msg = []
  req.on('data', (chunk) => {
    if(chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

app.use(router)