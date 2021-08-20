//Login Controller
module.exports.login = function (req, res) {
  return res.render("login");
};

//Sign-up Controller

module.exports.create = function (req, res) {
  return res.render("sign_up");
};

//Login/Signup authentication

module.exports.loginSession = function (req, res) {
  const idToken = req.body.idToken.toString();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  admin
    .auth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        const options = { maxAge: expiresIn, httpOnly: true };
        res.cookie("session", sessionCookie, options);
        return res.end(JSON.stringify({ status: "success" }));
      },
      (error) => {
        return res.status(401).send("UNAUTHORIZED REQUEST!");
      }
    );
};

//Logout

module.exports.sessionLogout = function (req, res) {
  res.clearCookie("session");
  return res.redirect("/login");
};
