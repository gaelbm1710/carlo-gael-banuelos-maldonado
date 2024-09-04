const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();
const {
  DB_PASSWORD,
  DB_HOST,
  DB_USER,
  api_Version,
  serverip,
} = require("./constants");

//Puerto
const Port = process.env.POST || 3977;

//Conexion a Base de datos MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=Backend`
    );
    //console.log(`mongodb+srv://gaelmaldonado867:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=Backend`);
    console.log("La conexión es exitosa");
    app.listen(Port, () => {
      console.log(`http://${serverip}:${Port}/api/${api_Version}`);
    });
  } catch (error) {
    console.log("Error al conectarse a la base de datos ", error);
    //console.log(`mongodb+srv://gaelmaldonado867:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=Backend`);
  }
};

connectDB();
/*
app.get(`/`, (req,res) =>{
    res.send("Para ver si jala de raiz");
});
*/
