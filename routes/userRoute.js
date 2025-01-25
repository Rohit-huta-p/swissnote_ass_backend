const router = require('express').Router()
const { register, login, fetchUserDetails, bookedvents } = require('../controller/userController');
const verifyToken = require("../utils/verifyToken")
/**
 * *USER ROUTES
 *              method  route
 *  Userdetails  GET   /fetch (email, password)
 *  REGISTER     POST   /register (email, password)
 *  Login        POST   /login (email, password)
 * 
 */ 


router.get('/fetch_userdetails', verifyToken , fetchUserDetails)
router.post('/register', register)
router.post('/login', login)


router.post('/bookedEvents/:is_retrieve_full', verifyToken, bookedvents)




module.exports = router;