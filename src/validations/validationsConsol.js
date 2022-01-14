const { check } = require("express-validator");
const path = require("path");

module.exports = [
  check("name").notEmpty().withMessage("Debes ingresar un nombre de consola").bail().isLength({ min: 3 }).withMessage("El nombre de la consola debe ser mas largo"),

  check("consol_image").custom((value, { req }) => {
    let file = req.files.consol_image;
    let acceptedExtensions = [".jpg", ".png", ".gif", ".jpeg"];

    if (!file) {
      throw new Error("Tienes que subir una imagen");
    } else {
      let fileExtension = path.extname(file[0].originalname);
      console.log(fileExtension);
      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
      }
    }

    return true;
  }),

  //    check("logo").notEmpty().withMessage("Debes cargar un logo para la consola").bail()
];
