const optionsMDB = {
    client: 'mysql',
    connection:{
        host: '127.0.0.1',
        user: 'root',
        password: '123',
        database: 'proyectoNode',
        port: 3306
    }
}

const optionsLite = {
    client: 'sqlite3',
    connection: {
        filename: "./DB/ecommerce.sqlite"
    },
    useNullAsDefault: true
}

module.exports = {
    optionsMDB,
    optionsLite
}