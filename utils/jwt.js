const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

//Creacion de Token de Acceso
function createAccessToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 1);
  const payload = {
    token_type: "access",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET);
}

//Refrescar Token
function createRefreshToken(user) {
  const expToken = new Date();
  expToken.setHours(expToken.getHours() + 1);
  const payload = {
    token_type: "refresh",
    user_id: user._id,
    iat: Date.now(),
    exp: expToken.getTime(),
  };
  return jwt.sign(payload, JWT_SECRET);
}

function decoded(token) {
  return jwt.decode(token, JWT_SECRET, true);
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  decoded,
};
