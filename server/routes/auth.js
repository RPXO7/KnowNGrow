// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';
// import { auth } from '../middleware/auth.js';

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
    
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     user = new User({ name, email, password });
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '7d'
//     });

//     res.status(201).json({ token, user: { id: user._id, name, email } });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '7d'
//     });

//     res.json({ token, user: { id: user._id, name: user.name, email } });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// router.get('/me', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select('-password');
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;