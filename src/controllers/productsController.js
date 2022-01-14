const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");

/* Importando informacion de las consolas*/
const productColorsJSON = fs.readFileSync("src/database/productosColores.json", "utf-8");
const productColors = JSON.parse(productColorsJSON);

const productMemoriesJSON = fs.readFileSync("src/database/productosMemorias.json", "utf-8");
const productMemories = JSON.parse(productMemoriesJSON);

/*Importando Consolas y Productos*/

const consolServices = require("../services/consolServices");
const productsServices = require("../services/productsServices");

const productsController = {
  products: (req, res) => {
    res.render("products/products", {
      products: productsServices.getAll(),
      consols: consolServices.getAll(),
    });
  },

  cart: (req, res) => {
    res.render("products/productCart");
  },

  details: (req, res) => {
    const id = req.params.id;
    const product = productsServices.findOne(id);

    res.render("products/productDetail", {
      product,
      productColors,
      productMemories,
      consols: consolServices.getAll(),
      products: productsServices.getAll(),
    });
  },

  edit: (req, res) => {
    const idSearch = req.params.id;
    product = productsServices.findOne(idSearch);

    res.render("products/productEdit", {
      product,
    });
  },

  update: (req, res) => {
    const idSearch = req.params.id;
    productsServices.update(idSearch, req.body /*, req.file.filename*/);
    res.redirect(`/products/details/${idSearch}`);
  },

  confirmDestroy: (req, res) => {
    const idSearch = req.params.id;
    product = productsServices.findOne(idSearch);
    res.render("products/productDelete", {
      product,
    });
  },

  destroy: (req, res) => {
    const idSearch = req.params.id;
    productsServices.destroy(idSearch);
    res.redirect("/products");
  },

  add: (req, res) => {
    res.render("products/productAdd", {
      old: req.body,
    });
  },

  store: (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      productsServices.create(req.body, req.file.filename);
      res.redirect("/products");
    } else {
      res.render("products/productAdd", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },
};

module.exports = productsController;
