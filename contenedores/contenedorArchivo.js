import {promises as fs} from "fs"

import {schema, normalize} from "normalizr"
import util from "util"

function print(objeto) {
   console.log(util.inspect(objeto, false, 12, true))
}

// Definimos un esquema de usuarios (autores y comentadores)
const authorSchema = new schema.Entity("autores")
const msgSchema = {
   author: authorSchema,
}

class ContenedorArchivo {
   constructor(ruta) {
      this.ruta = ruta
   }

   async readAll() {
      try {
         const data = await fs.readFile(this.ruta)
         const mensajes = JSON.parse(data)

         const nData = normalize(mensajes, [msgSchema])
         //console.log(nData)
         return nData
      } catch (error) {}
   }
   async readData() {
      try {
         const data = await fs.readFile(this.ruta)
         const mensajes = JSON.parse(data)
         return mensajes
      } catch (error) {}
   }
   async readID(id) {
      const data = await this.readData()
      //console.log(data)
      const find = data.find((p) => p.id == id)
      //console.log(find)
      return find
   }
   async newMensaje(mensaje) {
      const mensajes = await this.readData()
      //console.log(mensajes)
      mensajes.push(mensaje)

      await this.writeFile(mensajes)
      return mensajes
   }

   async writeFile(data, log) {
      try {
         const content = await fs.writeFile(this.ruta, JSON.stringify(data, null, 2))
         console.log(log ? log : "Guardado con Exito")

         return content
      } catch (error) {
         console.log("Error de escritura!", error)
      }
   }
}

export default ContenedorArchivo
