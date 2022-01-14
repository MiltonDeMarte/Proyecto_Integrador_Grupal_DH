const genders = ["RPG", "Action", "Adventure", "Sports", "Shooters", "Indie", "Race", "Puzzles"];

const gamesServices = require("../services/gamesServices");
const consolServices = require("../services/consolServices");
const { validationResult } = require("express-validator");

const gamesController = {
  /*INDEX*/
  index: (req, res) => {
    res.render("games/details", {
      consols: consolServices.getAll(),
      games: gamesServices.getAll(),
    });
  },

  /**GAME SERVICES**/
  /*Create Game Form*/
  createGame: (req, res) => {
    res.render("games/gamesCreation", {
      genders,
    });
  },

  /*Save Game*/
  storeGame: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      gamesServices.create(req.body, req.file.filename);
      res.redirect("/games");
    } else {
      res.render("games/gamesCreation", {
        errors: errors.mapped(),
        old: req.body,
        genders,
      });
    }
  },

  /*Edit Game*/
  editGame: (req, res) => {
    idSearch = req.params.id;
    const game = gamesServices.findOne(idSearch);

    res.render("games/gamesEdit", {
      game,
    });
  },

  /*Update Game*/
  updateGame: (req, res) => {
    const idSearch = req.params.id;
    gamesServices.update(idSearch, req.body /*, req.file.filename*/);
    res.redirect("/games");
  },

  /*Destroy Game*/
  destroyGame: (req, res) => {
    const idSearch = req.params.id;
    gamesServices.destroy(idSearch);
    res.redirect("/games");
  },
};

module.exports = gamesController;
