let productosDao
let carritosDao

switch (process.env.PERS) {
    case 'json':

        const { default: ProductosDaoArchivo } = await import('./productos/productosDaoArchivo.js');
        const { default: CarritosDaoArchivo } = await import('./carritos/carritosDaoArchivo.js');

        productosDao = new ProductosDaoArchivo();
        carritosDao = new CarritosDaoArchivo();
        break

    case 'firebase':

        const { default: ProductosDaoFirebase } = await import('./productos/productosDaoFirebase.js');
        const { default: CarritosDaoFirebase } = await import('./carritos/carritosDaoFirebase.js');

        productosDao = new ProductosDaoFirebase();
        carritosDao = new CarritosDaoFirebase();
        break

    case 'mongodb':

        const { default: ProductosDaoMongoDB } = await import('./productos/productosDaoMongoDB.js');
        const { default: CarritosDaoMongoDB } = await import('./carritos/carritosDaoMongoDB.js');

        productosDao = new ProductosDaoMongoDB();
        carritosDao = new CarritosDaoMongoDB();
        break
        
    default:
        
        break
}

export { productosDao, carritosDao }