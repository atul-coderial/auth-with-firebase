//Home
module.exports.home = function (req, res) {
  return res.render("home");
};

//Profile
module.exports.profile = function (req, res) {
  const sessionCookie = req.cookies.session || "";

  admin
    .auth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then(() => {
      return res.render("profile");
    })
    .catch((error) => {
      return res.redirect("/login");
    });
};
