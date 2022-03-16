import ContenedorProductos from "../contenedores/contenedorProducto.js"
import config from "../options/config.js"

const ProductosDB = new ContenedorProductos(config.MDB, "productos")
//console.log(ProductosDB)

export default ProductosDB
