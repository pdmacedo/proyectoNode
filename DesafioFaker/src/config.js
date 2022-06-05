import knex from "knex";

const optionsMDB = knex({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123",
    database: "proyectonode",
    port: 3306,
  },
});

export default optionsMDB;
