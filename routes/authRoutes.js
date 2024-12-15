import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User.js";
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);
        
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Compare plain password with hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate a JWT token
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      
      res.status(200).json({ token, user: { username: user.username, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  });

// Logout (optional for token-based auth)
router.post("/logout", (req, res) => {
    // Token-based logout is handled client-side by deleting the token
    res.status(200).json({ message: "Logged out successfully" });
});

export default router
