const admin = require("firebase-admin");
const { ConectaFirebase } = require("../config.js");

class ContenedorFirebase {
  constructor() {
    ConectaFirebase();
  }

  //CRUD

  async guardar(elem) {
    const db = admin.firestore();
    const query = db.collection("productos");

    try {
      let doc = query.doc();
      await doc.create(elem);
      console.log("Datos insertados");
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    const db = admin.firestore();
    const query = db.collection("productos");

    try {
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;

      const response = docs.map((doc) => ({
        id: doc.id,
        nombre: doc.data().nombre,
        descripcion: doc.data().descripcion,
        codigo: doc.data().codigo,
        foto: doc.data().foto,
        precio: doc.data().precio,
        stock: doc.data().stock,
      }));

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async getById(cod) {
    const db = admin.firestore();
    const query = db.collection("productos");

    try {
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;
  
        docs = docs.map(function (doc){
            if(doc.data().codigo == cod){
                console.log(doc.data());
            }
            return doc;
        });
  
    } catch (error) {
      console.log(error);
    }
  }

  async actualizar(cod) {

    const db = admin.firestore();
    const query = db.collection("productos");

    try {
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;
  
        docs = docs.map(function (pro){
            if(pro.data().codigo == cod){
                const doc = query.doc(`${pro.id}`);
                let item =  doc.update({stock : 20});
                console.log("El producto se ha actualizado");
            }
            return pro;
        });
  
    } catch (error) {
      console.log(error);
    }
    

  }

  async delete(cod) {
    const db = admin.firestore();
    const query = db.collection("productos");

    try {
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;
  
        docs = docs.map(function (pro){
            if(pro.data().codigo == cod){
                const doc = query.doc(`${pro.id}`);
                let item =  doc.delete();
                console.log("El producto se ha eliminado");
            }
            return pro;
        });
  
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContenedorFirebase;
