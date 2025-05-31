import jwt from 'jsonwebtoken';

/**
 * Authentication middleware for JWT token verification
 * Protects routes by validating JWT tokens in request headers
 */

/**
 * Middleware to verify JWT token
 * Extracts token from Authorization header and verifies its validity
 * Adds user ID to request object if token is valid
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {void}
 */
export const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  // Format: "Bearer <token>"
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Ingen token tillhandahållen' });
  }

  try {
    // Verify token using JWT_SECRET from environment variables
    // This ensures the token was signed by our server
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user ID from token payload to request object
    // This makes the user ID available to subsequent middleware and route handlers
    req.user = { _id: decoded.userId };
    
    next();
  } catch (error) {
    // Log error for debugging but don't expose details to client
    // eslint-disable-next-line no-console
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Ogiltig token' });
  }
}; 