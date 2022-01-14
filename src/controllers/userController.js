const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const userServices = require("../services/userServices");
const bcryptjs = require("bcryptjs");

const usersJSON = path.join(__dirname, "../database/usuarios.json");
const users = JSON.parse(fs.readFileSync(usersJSON, "utf-8"));

const userController = {
  /*Register Method*/
  register: (req, res) => {
    res.render("user/register");
  },

  /*Login Method*/
  login: (req, res) => {
    res.render("user/login");
  },

  /*Store user in DataBase*/
  storeUser: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("user/register", {
        errors: errors.mapped(),
        old: req.body,
      });
    } else {
      userServices.create(req.body, req.file.filename);
      res.redirect("/user/login");
    }
  },

  /*Edit user view*/
  editUser: (req, res) => {
    res.render("user/edit");
  },

  /*Update user information*/
  updateUser: (req, res) => {
    userServices.update(req.body, req.file.filename);
    res.redirect("/user/profile");
  },

  confirmDestroy: (req, res) => {
    const idSearch = req.params.id;
    user = userServices.findOne(idSearch);
    res.render("user/delete", {
      user,
    });
  },

  /*Delete user from DataBase*/
  destroyUser: (req, res) => {
    const idSearch = req.params.id;
    userServices.destroy(idSearch);
    res.clearCookie("userEmail");
    req.session.destroy();
    res.redirect("/");
  },

  /*Confirm user Login attempt*/
  confirmUser: (req, res) => {
    let loginUser = userServices.findEmail(req.body.email);

    if (loginUser) {
      if (bcryptjs.compareSync(req.body.password, loginUser.password)) {
        //       req.session.userLogged = {...loginUser, password : undefined};

        req.session.userLoggedId = loginUser.id;

        if (req.body.remember_user) {
          res.cookie("userEmail", req.body.email, {
            maxAge: 1000 * 60 * 60,
          });
        }
        return res.redirect("/");
      }
      return res.render("user/login", {
        errors: {
          email: {
            msg: "Email o contraseña invalido",
          },
        },
      });
    }

    return res.render("user/login", {
      errors: {
        email: {
          msg: "Email o contraseña invalido adasdasd",
        },
      },
    });
  },

  /*Get user profile*/
  profile: (req, res) => {
    res.render("user/profile");
  },

  /*Logout user from service*/
  logout: (req, res) => {
    res.clearCookie("userEmail");
    req.session.destroy();
    return res.redirect("/");
  },
};

module.exports = userController;
