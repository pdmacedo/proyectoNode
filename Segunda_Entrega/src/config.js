// Conexión MongoDB

function ConectaMongoDB() {
  const mongoose = require("mongoose");
  const URL =
    "mongodb+srv://pdmacedo:1893@cluster0.g7vei.mongodb.net/ecommerce?retryWrites=true&w=majority";

  ConectMongo();

  async function ConectMongo() {
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Base de datos conectada");
    } catch (error) {
      console.log(error);
    }
  }
}

// Conexión Firebase

function ConectaFirebase() {
  const admin = require("firebase-admin");
  const serviceAccount = require("../DB/conectFirebase.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://proyectonode-27a7c.firebaseio.com",
  });
  
  console.log("Base firebase conectada");
}

module.exports = {
  ConectaMongoDB,
  ConectaFirebase,
};
