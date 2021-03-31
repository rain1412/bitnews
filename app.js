const express=require('express')
const server=express()

// 跨域
const cors=require('cors')
server.use(cors())

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

server.listen(3000,()=>{
    console.log('接口完成');
})