const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const jwt_secret = "grupo-4";

exports.getLogin = async (req, res, next) => {
  res.render("login-usuario", {
    titulo: "Inicio de sesión del cliente",
    path: "/",
  });
};
exports.getSignup = async (req, res, next) => {
  res.render("signup-usuario", {
    titulo: "Creación de nueva cuenta",
    path: "/",
  });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const token = req.cookies.jwt;
      const decoded = jwt.verify(token, jwt_secret);
      const user = await Usuario.findById(decoded.id);
      if (user) {
        const currentUser = user;
        res.locals.user = currentUser;
        return next();
      }
      return next();
    } catch (err) {
      return next();
    }
  }
  return next();
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res
      .status(404)
      .json({ error: "Se requiere todos los campos llenos" });
  }

  const user = await Usuario.findByEmail(email);

  if (user && user.password == password) {
    const token = jwt.sign({ id: user._id }, jwt_secret, {
      expiresIn: "120d",
    });
    const cookieOptions = {
      expires: new Date(Date.now() + 86400000), // Cookie expira en un dia
      httpOnly: true,
    };
    res.cookie(`jwt`, token, cookieOptions);
    res.redirect("/");
  } else {
    return res.status(400).json({ error: "usuario no encontrado" });
  }
};

exports.postLogout = async (req, res, next) => {
  res.cookie(`jwt`, `loggedout`, {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.redirect("/");
};

exports.postSignup = async (req, res, next) => {
  const { nombres, apellidos, email, password, password2 } = req.body;
  if (!(nombres && apellidos && email && password && password2)) {
    return res
      .status(404)
      .json({ error: "Se requiere todos los campos llenos" });
  }
  if (password != password2) {
    return res
      .status(404)
      .json({ error: "Se requiere que las contraseñas sean iguales" });
  }
  const new_user = new Usuario(null, nombres, apellidos, email, password, 0);
  new_user.save();
  res.redirect("/");
};
