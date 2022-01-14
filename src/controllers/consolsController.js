const consolServices = require("../services/consolServices");
const { validationResult } = require("express-validator");

const consolsController = {
  /**CONSOL SERVICES**/
  /*Create Consol Form*/
  createConsol: (req, res) => {
    res.render("games/consolsCreation", {
      old: req.body,
    });
  },

  /*Save Consol*/
  storeConsol: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      console.log(req.files.consol_image[0]);
      consolServices.create(req.body, req.files.logo, req.files.consol_image);
      res.redirect("/games");
    } else {
      res.render("games/consolsCreation", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  /*Edit Consol*/
  editConsol: (req, res) => {
    const idSearch = req.params.id;
    consol = consolServices.findOne(idSearch);

    res.render("games/consolsEdit", {
      consol,
    });
  },

  /*Update Consol*/
  updateConsol: (req, res) => {
    const idSearch = req.params.id;
    consolServices.update(idSearch, req.body, req.files);
    res.redirect("/games");
  },

  /*Destroy Consol form*/
  destroy: (req, res) => {
    const consol = consolServices.findOne(req.params.id);
    res.render("games/consolDelete", {
      consol,
    });
  },

  /*Destroy Consol*/
  destroyConsol: (req, res) => {
    const idSearch = req.params.id;
    consolServices.destroy(idSearch);
    res.redirect("/games");
  },
};

module.exports = consolsController;
