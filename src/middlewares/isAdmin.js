module.exports = isAdmin => {
  return (req, res, next) => {
    if (req.userData.admin === isAdmin) {
      return next();
    }
    return res.status(401).json({ message: 'Ação não permitida' });
  };
};
