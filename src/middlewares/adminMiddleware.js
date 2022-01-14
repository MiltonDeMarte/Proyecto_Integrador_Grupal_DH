const userServices = require("../services/userServices");

function adminMiddleware(req, res, next) {
  const user = userServices.findOne(req.session.userLoggedId);
  if (!user) {
    return res.redirect("/");
  } else if (!user.admin) {
    return res.redirect("/");
  }
  next();
}

module.exports = adminMiddleware;
