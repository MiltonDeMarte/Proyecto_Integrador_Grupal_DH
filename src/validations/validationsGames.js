const { check } = require("express-validator");
const path = require("path");

module.exports = [
  check("name")
    .notEmpty()
    .withMessage("Debes ingresar el nombre del juego")
    .bail()
    .isLength({ min: 3 })
    .withMessage("El nombre debe ser mas largo"),

  check("gender").notEmpty().withMessage("Debes seleccionar el genero del juego, ejemplo :'RPG'").bail(),

  check("consol").notEmpty().withMessage("Debes seleccionar una consla del juego, ejemplo :'PlayStation'").bail(),

  check("description")
    .notEmpty()
    .withMessage("Ingresar breve descripcion del juego")
    .bail()
    .isLength({ min: 10 })
    .withMessage("La descripcion debe de ser mas larga"),
  check("game_images").custom((value, { req }) => {
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
];
