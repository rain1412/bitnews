const express = require('express')
const server = express()

// 跨域
const cors = require('cors')
server.use(cors())

const jwt = require('express-jwt');

/* 测试
server.use((req,res)=>{
    res.end('ok')
}) 
*///,  /^\/uploads\/.*/

// 路由接口
const apiRouter = require('./router/api.js')
const myRouter = require('./router/my_router.js')
const usrRouter = require('./router/user.js')
server.use('/api', apiRouter)
server.use('/my/article', myRouter)
server.use('/my',usrRouter)

server.use(jwt({
  secret: 'gz61', // 生成token时的钥匙
  algorithms: ['HS256'] // 加密算法
}).unless({
  path: ['api/reguser','/api/login']
}));

// 错误处理中间件
server.use((err, req, res, next) => {
  console.log('有错误', err)
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ code: 1, message: '身份认证失败！' });
  }
});

server.listen(3000, () => {
  console.log('接口完成');
})