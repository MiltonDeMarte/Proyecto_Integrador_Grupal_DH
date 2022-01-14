const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const gamesController = require("../controllers/gamesController.js");
const middlewareImages = require("../middlewares/middlewareImages.js");
const validationsGames = require("../validations/validationsGames.js");
const targetFolder = path.resolve(__dirname, "../../public/images/game_images");
const adminMiddleware = require("../middlewares/adminMiddleware");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, targetFolder);
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_game${path.extname(file.originalname)}`);
  },
});

const uploadFile = multer({ storage });

/*-Index Games-*/
router.get("/", gamesController.index);

/*-Games Creation-*/
/**request form**/
router.get("/gamesCreation", adminMiddleware, gamesController.createGame);
/**store method**/
router.post("/", uploadFile.single("game_images", middlewareImages), validationsGames, gamesController.storeGame);
/**edit method**/
router.get("/:id/edit", adminMiddleware, gamesController.editGame);
/**update method**/
router.put("/:id", uploadFile.single("game_images", middlewareImages), gamesController.updateGame);
/**delete method**/
router.delete("/:id", gamesController.destroyGame);

module.exports = router;
