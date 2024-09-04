const User = require("../models/users");
const jwt = require("../utils/jwt");
const bcrypt = require("bcryptjs");
const JOI = require("joi");
const image = require("../utils/image");

//Validacion del Registro cob JOI
const registerSchema = JOI.object({
  name: JOI.string().min(3).max(60).required().messages({
    "string.empty": "El nombre debe ser obligatorio",
  }),
  phone: JOI.string()
    .pattern(/^[0-9]{10,12}$/)
    .required()
    .messages({
      "string.empty": "El telefono es obligatorio",
    }),
  password: JOI.string().min(6).max(30).required().messages({
    "string.empty": "La contraseña es obligatoria",
  }),
});

function register(req, res) {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  const { name, phone, password, avatar } = req.body;
  const user = new User(req.body);
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;
  const imagePath = image.getFilePath(req.files.avatar);
  user.avatar = imagePath;
  const saveUser = async () => {
    try {
      await user.save();
      res.status(200).send({ msg: "USuario Creado" });
    } catch (error) {
      res.status(400).send({ msg: "Error al crear usuario" });
      console.log(error);
    }
  };
  saveUser();
}

//Validacion del LOGIN cob JOI
const LoginSchema = JOI.object({
  name: JOI.string().min(3).max(60).required().messages({
    "string.empty": "El nombre debe ser obligatorio",
  }),
  phone: JOI.string()
    .pattern(/^[0-9]{10,12}$/)
    .required()
    .messages({
      "string.empty": "El telefono es obligatorio",
    }),
  password: JOI.string().min(6).max(30).required().messages({
    "string.empty": "La contraseña es obligatoria",
  }),
});
async function login(req, res) {
  const { name, phone, password } = req.body;
  const { error } = LoginSchema.validate(req.body);
  if (error) return res.status(400).send({ msg: error.details[0].message });
  try {
    const response = await User.findOne({ name });
    bcrypt.compare(password, response.password, (bcryptError, check) => {
      if (bcryptError) {
        res.status(500).send({ msg: "Error del servidor" });
      } else if (!check) {
        res.status(400).send({ msg: "Contraseña incorrecta" });
      } else {
        res.status(200).send({
          access: jwt.createAccessToken(response),
          refesh: jwt.createRefreshToken(response),
        });
      }
    });
  } catch (error) {
    res.status(500).send({ msg: "Error del servidor" });
    console.log(error);
  }
}

async function refreshAccesToken(req, res) {
  const { token } = req.body;
  if (!token) res.status(400).send({ msg: "token requerido" });
  const { user_id } = jwt.decoded(token);
  try {
    const response = await User.findOne({ _id: user_id });
    console.log(response);
    res.status(200).send({
      accessToken: jwt.createAccessToken(response),
    });
  } catch (error) {
    res.status(500).send({ msg: "Error en el Servidor " });
    console.log(error);
  }
}

module.exports = {
  register,
  login,
  refreshAccesToken,
};
