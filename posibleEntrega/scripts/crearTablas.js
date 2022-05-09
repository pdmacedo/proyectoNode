const { optionsMDB, optionsLite } = require("../src/config");
const knexMDB = require("knex")(optionsMDB);
const knexLite = require("knex")(optionsLite);

class creaTabla {
  // Productos en MariaDb

  creaTablaProduct() {
    try {
      //Conexión, eliminar tabla si existe y crear tabla
      knexMDB.schema
        .dropTableIfExists("productos")
        .then(() => {
          knexMDB.schema
            .createTable("productos", (table) => {
              table.increments("id").primary();
              table.string("nombre", 50).notNullable();
              table.float("precio");
              table.string("url", 100).notNullable();
            })
            .then(() => console.log("Tabla productos en MariaDB creada"));
        })
        .catch((err) => {
          console.log(err);
          throw err;
        })
        // Destruir conexion
        .finally(() => {
          knexMDB.destroy();
        });
    } catch (error) {
      console.log("Error al crear tabla productos en mariaDb");
      console.log(error);
    }
  }

  // Mensajes en SQLite3

  creaTablaMensaje() {
    try {
      //Conexión, eliminar tabla si existe y crear tabla
      knexLite.schema
        .dropTableIfExists("mensajes")
        .then(() => {
          knexLite.schema
            .createTable("mensajes", (table) => {
              table.increments("id").primary();
              table.string("username", 20).notNullable();
              table.string("text", 100).notNullable();
            })
            .then(() => console.log("Tabla mensajes en Sqlite3 creada"));
        })
        .catch((err) => {
          console.log(err);
          throw err;
        })
        // Destruir conexion
        .finally(() => {
          knexLite.destroy();
        });
    } catch (error) {
      console.log("Error al crear tabla mensajes en sqlite3");
      console.log(error);
    }
  }
}

module.exports = creaTabla;
