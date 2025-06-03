const express = require('express');
const router = express.Router();
const {body} = require('express-validator') 
const checkToken = require('../Middleware/UserMiddleware');
const UserController = require('../controller/UserController')


 

router.post('/register', [
  body('name').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
] , UserController.registerUser);


router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long'),
], UserController.loginUser);
 
// procted
router.get('/profile', checkToken.autUser, UserController.getUserProfile);
router.get('/logout', checkToken.autUser, UserController.logoutUser);


module.exports = router;
