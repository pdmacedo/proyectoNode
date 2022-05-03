import knex from "knex";

class MysqlDB {
  constructor(nombreConfig, nombreTabla) {
    this.knex = knex(nombreConfig);
    this.tabla = nombreTabla;
  }

  async createTable() {
    return await this.knex.schema.dropTableIfExists(nombreTabla).finally(() => {
      return await this.knex.schema.createTable(nombreTabla, (table) => {
        if (nombreTabla.includes("productos")) {
        table.increments("id").primary();
        table.string("nombre", 50).notNullable();
        table.float("precio");
        table.string("url", 100).notNullable();
        }else{
          table.string("username", 20).notNullable();
          table.string("text", 100).notNullable();
        }
      });
    });
  }

  async addProduct(prod) {
    return await this.knex(nombreTabla).insert(prod);
  }

  async getAll() {
    return await this.knex(nombreTabla).select('*');
  }

  async desconectar() {
    await this.knex.destroy();
  }
}

module.exports = MysqlDB;
