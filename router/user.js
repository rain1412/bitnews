const express = require('express')
const router = express.Router()
const conn = require('../util/sql.js')

const multer = require('multer')
// 保存文件
// const upload = multer({ dest: 'uploads' })
const storage = multer.diskStorage({
    // 位置
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // 名字：时间+后缀名
        const filenameArr = file.originalname.split('.');
        const fileName = Date.now() + "." + filenameArr[filenameArr.length - 1]
        cb(null, fileName)
    }
})
const upload = multer({ storage })

router.use(express.urlencoded())

// 获取用户的基本信息
router.get('/userinfo', (req, res) => {
    // res.end('ok')
    const { username } = req.query
    conn.query(`select * from users where username="${username}"`, (err, result) => {
        if (err) return
        res.json({
            "status": 0,
            "message": "获取用户基本信息成功！",
            "data": result
        })
    })
})

// 更新用户的基本信息
router.post('/userinfo', (req, res) => {
    // res.end('ok')
    const { id, nickname, email, userPic } = req.body
    let condition = []
    if (nickname) {
        condition.push(`nickname="${nickname}"`)
    }
    if (email) {
        condition.push(`email="${email}"`)
    }
    if (userPic) {
        condition.push(`userPic="${userPic}"`)
    }
    const conditionStr = condition.join()

    const sqlStr = `update users set ${conditionStr} where id=${id}`
    // console.log(sqlStr)
    conn.query(sqlStr, (err, result) => {
        console.log(err);
        console.log(result);
        if (err) {
            res.json({ code: 500, msg: '修改错误' })
            return
        }
        res.json({ "status": 0, "message": "修改用户信息成功！" })
    })
})

// 上传用户头像
router.post('/uploadPic', upload.single('file_data'), (req, res) => {
    // res.end('ok')
    // console.log('1',req.file);
    res.json({
        "code": 200,
        "msg": "上传成功",
        "src": "http://127.0.0.1:3000/uploads/" + req.file.filename
    })
})

// 重置密码
router.post('/updatepwd', (req, res) => {
    // res.end('ok')
    console.log(req.body);
    const { id, oldPwd, newPwd } = req.body
    conn.query(`select password from users where id=${id}`, (err, result) => {
        if (err) throw err;
        console.log(result);
        if (result[0].password != oldPwd) {
            res.json({ code: 500, msg: '旧密码错误' })
            return
        }
        conn.query(`update users set password='${newPwd}' where id=${id}`, (err, result) => {
            if (err) {
                res.json({ code: 500, msg: '密码修改失败' })
                return
            }
            res.json({ code: 200, "status": 0, "message": "更新密码成功！" })
        })
    })
})
module.exports = router