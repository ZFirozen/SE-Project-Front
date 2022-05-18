const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
server.set('haslogin',false)

server.use(middlewares)
server.use(jsonServer.rewriter({
  '/:resource/individual': '/:resource'
}))
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})
server.get('/login/status', (req, res)=>{
  if(server.get('haslogin')===true){
    res.status(200).jsonp()
  }else{
    res.status(401).jsonp()
  }
})
server.get('/account', (req, res)=>{
  if(server.get('haslogin')===true){
    res.status(200).jsonp({
      "userId" : 86,
      "userName" : "熊强",
      "userRole" : "voluptate"
    })
  }else{
    res.status(400).jsonp()
  }
})
server.post('/logout', (req, res)=>{
  if(server.get('haslogin')===true){
    server.set('haslogin',false)
    res.status(200).jsonp()
  }else{
    res.status(400).jsonp()
  }
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST' && req.url.match('register') !== null) {
    if (req.body.userName === 'failure') {
      res.status(400).jsonp({
        body: req.body.userName +' has been used.'
      })
      return
    }
    req.url = req.url.replace('register','userData')
  }else if (req.method === 'POST' && req.url.match('login') !== null) {
    if (req.body.userName === 'failure') {
      res.status(400).jsonp({})
      return
    }
    server.set('haslogin',true)
    res.status(200).jsonp({})
    return
  }
  // Continue to JSON Server router
  next()
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})