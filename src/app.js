const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const postman = require("postman");

/*Public*/
const publicDomain = path.resolve(__dirname, "../public");

/*Routes*/
const mainPage = require("./routes/main.js");
const mainProducts = require("./routes/products.js");
const mainUser = require("./routes/user.js");
const mainGames = require("./routes/games.js");
const mainConsols = require("./routes/consols.js");

const productsServices = require("./services/productsServices");
const consolServices = require("./services/consolServices.js");

//Middleware de Session
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

/*Server*/
/**ejs**/
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
/**urlencoded**/
app.use(express.urlencoded({ extended: false }));
/**JSON**/
app.use(express.json());
/**methodOverRide**/
app.use(methodOverride("_method"));
/**Session**/
app.use(
  session({
    secret: "secret text",
    resave: false,
    saveUninitialized: true,
  })
);
/**Cookies**/
app.use(cookieParser());
//Session Middleware
app.use(userLoggedMiddleware);

/**boot**/
app.listen(4000, () => {
  console.log("Servidor corriendo en el puerto: 4000");
});

/**static_files**/
app.use(express.static(publicDomain));

app.locals.products = productsServices.getAll();
app.locals.consols = consolServices.getAll();

/**views**/
app.use("/", mainPage);

app.use("/products", mainProducts);

app.use("/user", mainUser);

app.use("/games", mainGames);

app.use("/consols", mainConsols);

/**error-404**/
app.use((req, res, next) => {
  res.status(404).render(path.resolve(__dirname, "./views/main/not-found"));
});
