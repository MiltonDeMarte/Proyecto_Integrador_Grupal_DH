function guestMiddleware(req, res, next) {
  if (req.session.userLoggedId) {
    return res.redirect("/user/profile");
  }
  next();
}

module.exports = guestMiddleware;
