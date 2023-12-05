import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/userModel.js';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with the same email already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate an access token
     const accessToken = jwt.sign({ userId: newUser._id }, config.SECRET_KEY);

    // Send a response to the client
    res.status(201).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify if the email and password are correct
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate an access token
    const accessToken = jwt.sign({ userId: user._id }, config.SECRET_KEY);

    // Send a response to the client
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};
