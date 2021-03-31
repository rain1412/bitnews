const conn=require('./sql.js')
conn.query('select * from users',(err,result)=>{
    console.log(err);
    console.log(result);
})