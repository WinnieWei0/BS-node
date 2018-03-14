const express=require('express')
const router=require('./router.js')
let app=express()
app.listen(3000,()=>{
  console.log('http://127.0.0.1:3000')
})
app.use(router)