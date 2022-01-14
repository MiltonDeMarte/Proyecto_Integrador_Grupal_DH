function authMiddleware(req, res, next) {
  if (!req.session.userLoggedId) {
    return res.redirect("/user/login");
  }
  next();
}

module.exports = authMiddleware;
