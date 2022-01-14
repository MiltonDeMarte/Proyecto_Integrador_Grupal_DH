const userServices = require("../services/userServices");

function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;

  let emailInCookie = req.cookies.userEmail;
  let userFromCookie = userServices.findEmail(emailInCookie);

  if (userFromCookie) {
    req.session.userLoggedId = userFromCookie.id;
  }

  const user = userServices.findOne(req.session.userLoggedId);

  if (user) {
    res.locals.isLogged = true;
    res.locals.userLogged = user;
  }

  next();
}

module.exports = userLoggedMiddleware;
