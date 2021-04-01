const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
router.use(express.urlencoded())

// 文章分类列表
router.get('/article/cates', (req, res) => {
    // res.end('ok')
    conn.query('select * from categories', (err, result) => {
        if (err) {
            res.json({ code: 500, msg: '请求失败' })
            return
        }
        res.json({ code: 200, msg: '获取文章分类列表成功！', data: result })
    })
})

// 新增文章分类
router.post('/article/addcates', (req, res) => {
    console.log('用户传递的参数', req.body)
    const { name, slug } = req.body
    const sqlStr = `insert into categories (name,slug) values("${name}", "${slug}")`
    conn.query(sqlStr, (err, result) => {
        // console.log(err)
        // console.log(result)
        if (err) {
            res.json({ "code": 500, "msg": "服务器处理失败" })
            return
        }
        res.json({ "code": 200, "msg": "新增文章分类成功！" })

    })
    // res.end('ok')
})

// 根据 Id 删除文章分类
router.get('/article/deletecate', (req, res) => {
    // res.end('ok')
    const { id } = req.query
    conn.query(`delete from categories where id=${id};`, (err, results) => {
        if (err) return
        res.status(500).send({ code: 200, msg: '删除文章分类成功！' })
        // console.log(results)
    })
})

// 根据 Id 获取文章分类数据
router.get('/article/getCatesById', (req, res) => {
    const { id } = req.query
    // console.log('OK', id)
    conn.query(`SELECT * FROM  categories WHERE id=${id};`, (err, results) => {
        if (err) return res.status(500).send({ code: 500, msg: '服务器处理失败' })
        const cateItem = results[0]
        if (cateItem) {
            res.send({ code: 200, msg: '获取文章分类数据成功', data: cateItem })
        } else {
            res.status(400).send({ code: 400, msg: '参数错误' })
        }
    })
})

// 根据 Id 更新文章分类数据
router.post('/article/updatecate', (req, res) => {
    // res.end('ok')
    const { id, name, slug } = req.body
    const sqlStr = `update categories set name="${name}",slug="${slug}" where id=${id}`
    // 3. 执行sql操作数据库
    conn.query(sqlStr, (err, result) => {
        // console.log(err)
        // console.log(result)
        if (err) {
            res.json({ code: 500, msg: '修改错误' })
            return
        }
        res.json({ "status": 0, "message": "更新分类信息成功！" })
    })
})
module.exports = router