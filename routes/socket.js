
const{Router} = require('express')
const socketPost = require('../controllers/socketc')
const router = Router()

router.post('/', socketPost )










module.exports = router