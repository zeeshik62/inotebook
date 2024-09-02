import express from 'express';
import User from '../models/User.js';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fetchuser from '../middleware/fetchuser.js';


const JWT_SECRET = 'zeeshik$62';

//ROUTE:1
//Create a user using: POST '/api/auth/'. Doesn't require authentication'
router.post('/createuser', [
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'Email is already taken' }] });
    }
    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    // Create a new User instance
    user = new User({
      name,
      email,
      password: secPass
    });

    // Save the user to the database
    await user.save();
    // Create a JSON Web Token (JWT)
    const data = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(authToken);
    res.send({ authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// User.create({
//   name: req.body.name,
//   email: req.body.email, 
//   password: req.body.password
// }).then (user => res.json(user));

//ROUTE:2
//Authenticate a user: /api/auth/login
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password', 'Enter a password!').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), msg: 'Incorrect credentials' })
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Incorrect credentials' }] });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ errors: [{ msg: 'Incorrect credentials' }] });
    }
    const payload = {
      user: {
        id: user.id
      }
    }
    const authToken = jwt.sign(payload, JWT_SECRET);
    // console.log(authToken);
    res.send({ authToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//ROUTE:3 Get loggedin user details using:POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error 1122');
  }
});

export default router;