const authorization = (roles) => {
    return (req, res, next) => {
      if (!Array.isArray(roles)) {
        roles = [roles];
      }
  
      if (!roles.includes(req.token.role.role)) {
        return res.status(403).json({
          success: false,
          message: `Unauthorized`,
        });
      }
      next();
    };
  };
  
  module.exports = authorization;
  