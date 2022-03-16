import pkg from "knex"
import generarProducto from "../utils/generateProduct.js"
const {knex} = pkg
import {customAlphabet} from "nanoid"

const prodID = customAlphabet("1234567890abcdef", 4)

class ContenedorProductos {
   constructor(clientOptions, table) {
      this.client = clientOptions
      this.table = table
   }
   //Funcion para guardar producto
   createTableProducts() {
      try {
         knex(this.client)
            .schema.createTable(this.table, (data) => {
               data.increments("id").primary()
               data.string("idProd").notNullable()
               data.string("name").notNullable()
               data.string("price").notNullable()
               data.string("image").notNullable()
            })
            .then(() => console.log(`Se creo la tabla ${this.table}`))
            .finally(() => {
               knex(this.client).destroy()
            })
      } catch (error) {
         console.log("Error de Lectura!", error)
      }
   }
   ///
   //ApiMOCK

   async apiMock(cant) {
      const nuevos = []

      for (let i = 0; i < cant; i++) {
         const nuevoUsuario = generarProducto(prodID())

         try {
            nuevos.push(nuevoUsuario)
            await this.insertData(nuevos)
         } catch (error) {
            console.log(error)
         }
      }
      console.log(nuevos)
   }

   //INSERT DATA
   async insertData(data) {
      try {
         await knex(this.client)(this.table)
            .insert(data)
            .then(() => console.log("Data inserted"))
            .finally(() => {
               knex(this.client).destroy()
            })
      } catch (error) {
         console.log("Error de Lectura!", error)
      }
   }
   //GET ALL DATA
   async getAll() {
      try {
         const content = await knex(this.client)
            .from(this.table)
            .select("*")
            .finally(() => {
               knex(this.client).destroy()
            })
         //console.log(content)
         return content
      } catch (error) {
         console.log("Error de Lectura!", error)
      }
   }
   async getbyID(id) {
      try {
         const content = await knex(this.client)
            .from(this.table)
            .where({id: id})
            .first()
            .catch((err) => {
               console.log(err)
               throw err
            })
            .finally(() => {
               knex(this.client).destroy()
            })
         return content
      } catch (error) {
         console.log("No se encontro el ID!", error)
      }
   }
   async deleteByID(id) {
      try {
         const content = await knex(this.client)
            .from(this.table)
            .where({msgSock: id})
            .del()
            .then(() => console.log(`Dato con el id:${id} fue borrado`))
            .catch((err) => {
               console.log(err)
               throw err
            })
            .finally(() => {
               knex(this.client).destroy()
            })
         console.log(content)
         return content
      } catch (error) {
         console.log("No se encontro el ID!", error)
      }
   }
   async deleteData() {
      try {
         await knex(this.client)
            .from(this.table)
            .del()
            .then(() => console.log(`Datos borrados con exito`))
            .catch((err) => {
               console.log(err)
               throw err
            })
            .finally(() => {
               knex(this.client).destroy()
            })
      } catch (error) {
         console.log("No se encontro el ID!", error)
      }
   }

   async deleteProduct(id) {
      try {
         const content = await knex(this.client)
            .from(this.table)
            .where({id: id})
            .del()
            .then(() => console.log(`Dato con el id:${id} fue borrado`))
            .catch((err) => {
               console.log(err)
               throw err
            })
            .finally(() => {
               knex(this.client).destroy()
            })
         console.log(content)
         return content
      } catch (error) {
         console.log("No se encontro el ID!", error)
      }
   }

   async updateData(id, name, price, image, time) {
      try {
         const content = await knex(this.client)
            .from(this.table)
            .where({id: id})
            .update({name: name, price: price, image: image, time: time})
            .then(() => console.log(`Dato con el id:${id} fue editado`))
            .catch((err) => {
               console.log(err)
               throw err
            })
            .finally(() => {
               knex(this.client).destroy()
            })
         console.log(content)
         return content
      } catch (error) {
         console.log("No se encontro el ID!", error)
      }
   }
}

export default ContenedorProductos
