const express=require('express')
const router=express.Router()
// const conn=require('../util/sql.js')

// 文章分类列表
router.get('/article/cates',(req,res)=>{
    res.end('ok')
})

// 新增文章分类
router.post('/article/addcates',(req,res)=>{
    res.end('ok')
})

// 根据 Id 删除文章分类
router.get('/article/deletecate',(req,res)=>{
    res.end('ok')
})

// 根据 Id 获取文章分类数据
router.get('/article/getCatesById',(req,res)=>{
    res.end('ok')
})

// 根据 Id 更新文章分类数据
router.post('/article/updatecate',(req,res)=>{
    res.end('ok')
})
module.exports = router