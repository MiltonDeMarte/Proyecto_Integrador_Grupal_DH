const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const productsController = require("../controllers/productsController.js");
const middlewareImages = require("../middlewares/middlewareImages.js");
const validationsProducts = require("../validations/validationsProducts.js");
const targetFolder = path.join(__dirname, "../../public/images/productos");
const adminMiddleware = require("../middlewares/adminMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, targetFolder);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_product${path.extname(file.originalname)}`);
  },
});
const uploadFile = multer({ storage });

/*-Index Products-*/
router.get("/", productsController.products);

/*-Cart-*/
router.get("/cart", productsController.cart);

/*-Product Details-*/
router.get("/details/:id", productsController.details);

/*-Products Creation-*/
/**create form**/
router.get("/productAdd", adminMiddleware, productsController.add);
/**store method**/
router.post("/", uploadFile.single("product_image", middlewareImages), validationsProducts, productsController.store);
/**edit method**/
router.get("/:id/edit", adminMiddleware, productsController.edit);
/**update method**/
router.put("/:id", uploadFile.single("product_image", middlewareImages), productsController.update);
/**delete confirmation**/
router.get("/:id/delete", adminMiddleware, productsController.confirmDestroy);
/**delete method**/
router.delete("/:id", productsController.destroy);

module.exports = router;
