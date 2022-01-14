const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const consolsController = require("../controllers/consolsController.js");
const middlewareImages = require("../middlewares/middlewareImages.js");
const validationsConsol = require("../validations/validationsConsol.js");
const targetFolder = path.resolve(__dirname, "../../public/images/consolas");
const adminMiddleware = require("../middlewares/adminMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, targetFolder);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_consol${path.extname(file.originalname)}`);
  },
});
const uploadFile = multer({ storage });

/*-Consol Creation-*/
/**request form**/
router.get("/consolsCreation", adminMiddleware, consolsController.createConsol);
/**store method**/
router.post(
  "/",
  uploadFile.fields(
    [
      { name: "consol_image", maxCount: 1 },
      { name: "logo", maxCount: 1 },
    ],
    middlewareImages
  ),
  validationsConsol,
  consolsController.storeConsol
);
/**edit method**/
router.get("/:id/edit", adminMiddleware, consolsController.editConsol);
/**update method**/
router.put("/:id", uploadFile.single("consol_image", middlewareImages), consolsController.updateConsol);
/*Delete form*/
router.get("/:id/delete", adminMiddleware, consolsController.destroy);
/**delete method**/
router.delete("/:id", consolsController.destroyConsol);

module.exports = router;
