const optionsMDB = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "123",
    database: "proyectonode",
    port: 3306,
  },
};

const optionsLite = {
  client: "sqlite3",
  connection: {
    filename: "C:/Users/paulo/OneDrive/Desktop/posibleEntrega/DB/ecommerce.sqlite",
  },
  useNullAsDefault: true,
};

module.exports = {
  optionsMDB,
  optionsLite
};
