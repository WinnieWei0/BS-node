const express=require('express')
const router=require('./router.js')
const cors=require('cors')
const bodyParser = require('body-parser')
let app=express()
app.use(cors({
  origin: 'http://127.0.0.1:8080',
  credentials: true  // 是否带cookie
}));
// 接收不到post数据，添加中间件
//接收json数据
app.use(bodyParser.json({ limit: '50mb' }));
//extended:true代表可以接收任何数据类型的数据
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
app.listen(3000,()=>{
  console.log('http://127.0.0.1:3000')
})
app.use(router)