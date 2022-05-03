const { optionsMDB, optionsLite } = require('./options/mysqlDB');
const MysqlDB = require('../api/ContenedorSQL');

// Productos en MariaDb

try {
    //Conexión
    const conexMDB = new MysqlDB(optionsMDB, 'productos');
    // Elimina tabla si existe y crea otra vez.
    conexMDB.createTable(); 
    // destruir conexión
    conexMDB.desconectar();
    

    console.log('Tabla de productos en mariaDb creada con éxito')
} catch (error) {
    console.log('Error al crear tabla productos en mariaDb')
    console.log(error)
}

// Mensajes en SQLite3

try {
    //Conexión
    const conexLite = new MysqlDB(optionsLite, 'mensajes');
    // Elimina tabla si existe y crea otra vez.
    conexLite.createTable(); 
    // destruir conexión
    conexLite.desconectar();

    console.log('Tabla de mensajes en sqlite3 creada con éxito')
} catch (error) {
    console.log('Error al crear tabla mensajes en sqlite3')
}