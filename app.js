const express=require('express')
const router=require('./router.js')
const cors=require('cors')
let app=express()
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true  // 是否带cookie
}));
app.listen(3000,()=>{
  console.log('http://127.0.0.1:3000')
})
app.use(router)