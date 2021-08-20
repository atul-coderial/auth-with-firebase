//Loading library Express
const express = require("express");
//Cookie Parser
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
//Assinging Port No
const PORT = 8000;
const app = express();

const serviceAccount = require("./serviceAccountKey.json");

//Static Files
app.use(express.static("./assets"));
//View Engine
app.use("view engine", "ejs");
app.use("views", "./views");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://server-auth-41acc.firebaseio.com",
});

const csrfMiddleware = csrf({ cookie: true });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});

//Router Default Path
app.use("/", require("./routes"));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
