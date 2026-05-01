import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const register = async (req, res, next) => {
  try {
    const { name, email, password, tenantId } = req.body;
    const user = await User.create({ name, email, password, tenantId });
    res.status(201).json({ user });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role, tenantId: user.tenantId }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '12h',
    });
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
};
