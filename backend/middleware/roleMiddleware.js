const requireRole = (...roles) => (req, res, next) => {
  if (!req.role || !roles.includes(req.role)) {
    return res.status(403).json({ message: 'Access denied for this role.' });
  }
  next();
};

module.exports = { requireRole };
