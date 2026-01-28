const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("🔍 Role check debug:");
    console.log("User from req.user:", req.user);
    console.log("User role:", req.user?.role);
    console.log("Allowed roles:", allowedRoles);

    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };
};

export default roleCheck;
