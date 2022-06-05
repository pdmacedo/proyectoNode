import optionsMDB from "../src/config.js";

class creaTabla {
  // Productos en MariaDb
  creaTablaProduct() {
    try {
      //Conexión, eliminar tabla si existe y crear tabla
      optionsMDB.schema
        .dropTableIfExists("productos")
        .then(() => {
          optionsMDB.schema
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
          optionsMDB.destroy();
        });
    } catch (error) {
      console.log("Error al crear tabla productos en mariaDb");
      console.log(error);
    }
  }
}

export default creaTabla;
