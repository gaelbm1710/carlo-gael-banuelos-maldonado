require("dotenv").config();

//Conexion a MongoDB
const DB_USER = process.env.MDB_USER;
const DB_PASSWORD = process.env.MDB_PASSWORD;
const DB_HOST = process.env.MDB_HOST;

//Informacion de API
const api_Version = process.env.API_VERSION;
const serverip = process.env.IP_SERVER;

//Token
const JWT_SECRET = process.env.JWT_SECRET_KEY;

module.exports = {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  api_Version,
  serverip,
  JWT_SECRET,
};
