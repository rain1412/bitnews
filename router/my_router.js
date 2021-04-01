const express=require('express')
const router=express.Router()
const conn=require('../util/sql.js')

// 文章分类列表
router.get('/article/cates',(req,res)=>{
    // res.end('ok')
    conn.query('select * from categories',(err,result)=>{
        if(err){
            res.json({code: 500, msg: '请求失败'})
            return
        }
        res.json({code: 200, msg: '请求成功', data: result})
    })
})

// 新增文章分类
router.post('/article/addcates',(req,res)=>{
    console.log('用户传递的参数', req.query)
    const {name,slug}=req.query
    const sqlStr =`insert into categories (name,slug) values("${name}", "${slug}")`
    conn.query(sqlStr,(err, result)=>{
        // console.log(err)
        // console.log(result)
        if(err){
          res.json({"code":500,"msg":"服务器处理失败"})
          return
        }
        res.json({"code":200,"msg":"添加成功"})
    
      })
    // res.end('ok')
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