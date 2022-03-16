import {faker} from "@faker-js/faker"
faker.setLocale("es")
const generarProducto = (idProd) => {
   return {
      idProd,
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.business(),
   }
}
export default generarProducto
