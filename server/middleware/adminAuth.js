const adminAuth = (req, res, next) => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const providedPassword = req.headers['x-admin-password'];

  if (providedPassword === adminPassword) {
    next();
  } else {
    res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid admin password'
    });
  }
};

export default adminAuth;