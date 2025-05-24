import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Ingen token tillhandahållen' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload to request
    req.user = { _id: decoded.userId };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Ogiltig token' });
  }
}; 