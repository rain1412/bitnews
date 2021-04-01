const express=require('express')
const server=express()

// 跨域
const cors=require('cors')
server.use(cors())

 const jwt = require('express-jwt');
server.use(jwt({
    secret: 'gz61', // 生成token时的钥匙
    algorithms: ['HS256'] // 加密算法
  }).unless({
    path: ['/api/login', '/api/register', /^\/uploads\/.*/]
  }));
/* 测试
server.use((req,res)=>{
    res.end('ok')
}) 
*/

// 路由接口
const myRouter=require('./router/my_router.js')
const apiRouter=require('./router/api.js')
server.use('/my',myRouter)
server.use('/api',apiRouter)

// 错误处理中间件
server.use((err, req, res, next) => {
    console.log('有错误', err)
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ code: 1, message: '身份认证失败！' });
    }
  });

server.listen(3000,()=>{
    console.log('接口完成');
})