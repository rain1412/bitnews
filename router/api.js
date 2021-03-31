const express=require('express')
const router=express.Router()
// const conn=require('../util/sql.js')
// 注册接口
router.post('/reguser',(req,res)=>{
    res.end('ok')
})
// 登录接口
router.post('/login',(req,res)=>{
    res.end('ok')
})
module.exports = router