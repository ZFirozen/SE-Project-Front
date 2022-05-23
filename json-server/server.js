const jsonServer = require('json-server')
const server = jsonServer.create()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
server.set('haslogin', false)

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/:resource/individual': '/:resource',
  '/api/*': '/$1'
}))
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})
server.get('/login/status', (req, res) => {
  if (server.get('haslogin') === true) {
    res.status(200).jsonp()
  } else {
    res.status(401).jsonp()
  }
})
server.get('/account', (req, res) => {
  if (server.get('haslogin') === true) {
    res.status(200).jsonp({
      "userId": 86,
      "userName": "熊强",
      "userRole": "CUSTOMER"
    })
  } else {
    res.status(400).jsonp()
  }
})
server.post('/logout', (req, res) => {
  if (server.get('haslogin') === true) {
    server.set('haslogin', false)
    res.status(200).jsonp()
  } else {
    res.status(400).jsonp()
  }
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {

  //青春版url参数parser
  let parameters = req.url.match(/[^?&]+=[^&]+/g)
  if (parameters != null) {
    parameters.forEach(element => {
      eval('req.body.' + element.split('=').at(0) + '=\'' + element.split('=').at(1) + '\'')
    })
  }

  if (req.method === 'POST' && req.url.match('register') !== null) {
    if (db.get('userData').find({ userName: req.body.userName }).size().value() !== 0) {
      res.status(400).jsonp({
        body: req.body.userName + ' has been used.'
      })
    } else {
      req.body.id = req.body.userName
      db.get('userData').push(req.body).write()
      res.status(200).jsonp({})
    }
  } else if (req.method === 'POST' && req.url.match('login') !== null) {
    if (db.get('userData').find({ userName: req.body.userName, userPassword: req.body.userPassword }).size().value() === 0) {
      res.status(400).jsonp({
        userName: req.body.userName,
        userPassword: req.body.userPassword
      })
    } else {
      server.set('haslogin', true)
      res.status(200).jsonp({})
    }
  } else if (req.method === 'POST' && req.url.match('/contract/.+') !== null) {
    let contractid = req.url.match('(?<=/contract/).+').at(0)
    if (db.get('contract').find({ id: contractid }).size().value() !== 0) {
      db.get('contract').find({ id: contractid }).assign(req.body).write()
      res.status(200).jsonp({})
    } else {
      res.status(400).jsonp({})
    }
  } else {
    // Continue to JSON Server router
    next()
  }
})
server.render
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})