const { check } = require("express-validator");
const path = require("path");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Debes ingresar un nombre para el producto")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El nombre del producto debe ser mas largo"),

  check("description")
    .notEmpty()
    .withMessage("Debes ingresar una descripcion para el producto")
    .bail()
    .isLength({ min: 10 })
    .withMessage("La descripcion debe ser mas larga"),

  check("product_image").custom((value, { req }) => {
    let file = req.file;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
      }
    }

    return true;
  }),

  check("consol_color").notEmpty().withMessage("Seleccionar minimo 1 color para el producto").bail(),

  check("memory").notEmpty().withMessage("Seleccionar una capacidad de memoria para el producto"),

  check("price")
    .notEmpty()
    .withMessage("Indicar precio del producto")
    .bail()
    .isNumeric()
    .withMessage("Ingresar un formato de precio valido."),
];
