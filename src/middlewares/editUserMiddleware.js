function editUserMiddleware(req, res, next) {
  if (!req.session.userLoggedId) {
    return res.redirect("/");
  }

  if (req.params.id != req.session.userLoggedId) {
    return res.redirect(`/user/${req.session.userLoggedId}/edit`);
  }
  next();
}

module.exports = editUserMiddleware;
