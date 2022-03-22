import express from "express"
const app = express()
import {create} from "express-handlebars"
import path from "path"
const __dirname = path.dirname(new URL(import.meta.url).pathname)
import dotenv from "dotenv"
dotenv.config()

import ProductosDB from "./models/modelProducto.js"
//socket
import {createServer} from "http"
import {Server} from "socket.io"
import formatoMensaje from "./utils/formatoMensaje.js"

import msgDB from "./models/modelMensajeA.js"
import normalizeMsgs from "./utils/normalizeMsg.js"
const httpServer = createServer(app)
const io = new Server(httpServer)
//handlebars
const hbs = create({
   extname: ".hbs", //extension
   defaultLayout: "main",
   layoutsDir: path.join(app.get("views"), "layouts"),
   partialsDir: path.join(app.get("views"), "partials"),
})

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")
app.set("views", "./views")
app.use(express.static("./public"))

app.get("/", (req, res) => {
   res.render("index", {title: "Entrega 22 - MOCKS Y NORMALIZR"})
})
//POST MOCKS
app.post("/api/productos-test", async (req, res) => {
   const data = await ProductosDB.apiMock()
   res.send(data)
   //console.log(data)
})

//Mensaje de Prueba

/* const bot = formatoMensaje(
   "bot@gmail.com",
   "Roboto",
   "Bot",
   "0",
   "LilBot",
   "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-1024.png",
   "Bienvenido Al Chat"
) */

io.on("connection", async (socket) => {
   console.log("a user connected")

   const data = normalizeMsgs(await msgDB.readData())
   socket.emit("mensajes", data)
   socket.emit("loadProducts", await ProductosDB.getAll())
   socket.on("deleteProduct", async (id) => {
      console.log(id)
      await ProductosDB.deleteProduct(id)

      io.emit("loadProducts", await ProductosDB.getAll())
   })

   socket.on("getProduct", async (id) => {
      const listaProductos = await ProductosDB.getAll()
      const product = listaProductos.find((p) => p.id == id)
      //console.log(product)
      socket.emit("selectedProduct", product)
   })

   socket.on("chatMessage", async (msg) => {
      const mensaje = formatoMensaje(msg)
      await msgDB.newMensaje(mensaje)
      io.sockets.emit("mensajes", await normalizeMsgs(msgDB.readData()))
   })
   socket.on("typing", (data) => {
      //console.log(data)
      socket.broadcast.emit("typing", data)
   })
   socket.on("disconnect", () => {
      console.log("user disconnected")
   })
})
httpServer.listen(process.env.PORT, () => {
   console.log("listening on: ", process.env.PORT)
})
