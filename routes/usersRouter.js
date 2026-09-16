const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const checkToken = require('../Middleware/UserMiddleware');
const UserController = require('../controller/UserController');

// Reusable middleware to catch express-validator failures
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// --- Public Routes ---

// Register New User
router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ],
  validate,
  UserController.registerUser
);

// Login User
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validate,
  UserController.loginUser
);

// --- Protected Routes ---

router.get('/profile', checkToken.autUser, UserController.getUserProfile);
router.post('/logout', checkToken.autUser, UserController.logoutUser);

module.exports = router;
