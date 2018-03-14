const render=require('./render.js')
const express=require('express')
let router=express.Router()

router.get('/', render.getIndexPage);
router.get('/add', render.getAddPage);
router.get('/del', render.doDel);
router.get('/login', render.getLoginPage);
router.post('/login', render.doLogin);

module.exports = router;