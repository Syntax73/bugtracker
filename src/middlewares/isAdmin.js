module.exports = (req, res, next) => {
  const user = req.userData;

  if (user.admin === true) {
    return next();
  }

  return res.status(401).json({ message: 'Ação não permitida' });
};
