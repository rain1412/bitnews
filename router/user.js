const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')

router.use(express.urlencoded())

// 获取用户的基本信息
router.get('/userinfo',(req,res)=>{
    res.end('ok')
})

// 更新用户的基本信息
router.post('/userinfo',(req,res)=>{
    res.end('ok')
})

// 上传用户头像
router.post('/uploadPic',(req,res)=>{
    res.end('ok')
})

// 重置密码
router.post('/updatepwd',(req,res)=>{
    res.end('ok')
})
module.exports=router