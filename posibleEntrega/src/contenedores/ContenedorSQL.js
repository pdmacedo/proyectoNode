const knex = require("knex");

class ContenedorSQL {
  constructor(config, tabla) {
    this.knex = knex(config);
    this.tabla = tabla;
  }

  async listar(id) {
    await this.knex
      .from(this.tabla)
      .select("*")
      .where("id", "=", id)
      .then((rows) => {
        if (this.tabla.includes("productos")) {
          for (row of rows) {
            console.log(
              `${row["id"]} ${row["nombre"]} ${row["precio"]} ${row["url"]}`
            );
          }
        } else {
          for (row of rows) {
            console.log(`${row["id"]} ${row["username"]} ${row["text"]}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async listarAll() {
    await this.knex
      .from(this.tabla)
      .select("*")
      .then((rows) => {
        if (this.tabla.includes("productos")) {
          for (row of rows) {
            console.log(
              `${row["id"]} ${row["nombre"]} ${row["precio"]} ${row["url"]}`
            );
          }
        } else {
          for (row of rows) {
            console.log(`${row["id"]} ${row["username"]} ${row["text"]}`);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async guardar(elem) {
    await this.knex(this.tabla)
      .insert(elem)
      .then(() => console.log("Agregado"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async actualizar(elem, id) {
    await this.knex
      .from(this.tabla)
      .where("id", id)
      .update({ nombre: elem })
      .then(() => console.log("Actualizado"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async borrar(id) {
    await this.knex
      .from(this.tabla)
      .where("id", "=", id)
      .del()
      .then(() => console.log("Eliminado"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async borrarAll() {
    await this.knex
      .from(this.tabla)
      .del()
      .then(() => console.log("Todo eliminado"))
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        this.desconectar();
      });
  }

  async desconectar() {
    await this.knex.destroy();
  }
}

module.exports = ContenedorSQL;
