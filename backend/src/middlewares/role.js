module.exports = (role) => {
  return (req, res, next) => {
    const user = req.userData;

    if (user.role === role) {
      return next();
    }

    return res.status(401).json({ message: 'Ação não permitida' });
  };
};
