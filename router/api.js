const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')
const jwt = require('jsonwebtoken')
router.use(express.urlencoded())
// 注册接口
router.post('/reguser', (req, res) => {
    // res.end('ok')
    console.log('获取参数', req.body);
    const { username, password } = req.body;
    const sqlStr = `select username from users where username="${username}"`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            console.log(err)
            res.json({ code: 500, msg: "服务器错误" })
            return
        }
        console.log(result)
        // 用户名被占用了
        if (result.length > 0) {
            res.json({ code: 201, msg: "注册失败，名字占用了" })
            return
        }
        // 未被使用的用户名
        const sqlStr = `insert into users (username, password) values ("${username}", "${password}")`
        conn.query(sqlStr, (err, result) => {
            console.log(err)
            console.log(result)
            if (err) {
                res.json({ code: 500, msg: "服务器错误" })
                return
            }
            res.json({ "status": 0, code: 200, msg: '注册成功' })
        })
    })
})
// 登录接口
router.post('/login', (req, res) => {
    // res.end('ok')
    console.log('获取参数', req.body);
    const { username, password } = req.body;
    const sqlStr = `select * from users where username="${username} and password="${password}"`
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json({ code: 500, msg: "服务器错误" })
            return
        }
        console.log(result);
        if (result.length > 0) {
            const token = 'Bearer' + jwt.sign(
                { name: username },
                'gz61',
                { expiresIn: 2 * 60 * 60 }
            )
            res.json({
                "status": 0,
                "code": 200,
                "message": "登录成功！",
                "token": token
            })
        } else {
            res.json({ code: 201, msg: "登陆失败，用户名密码不对" })
        }
    })
})
module.exports = router