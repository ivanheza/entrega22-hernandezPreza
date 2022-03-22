const socket = io()
///Constantes

const productList = document.querySelector("#productList")
const productForm = document.querySelector("#productForm")
const chatForm = document.querySelector("#chat-form")
const chatMessages = document.querySelector("#chat-mensajes")
const inputChat = document.querySelector("#inputChat")
const btnSubmit = document.getElementById("botonProductos")
const mailUser = document.querySelector("#email")
const typing = document.querySelector("#actions")
const datosNorm = document.querySelector("#datos-Norm")
let savedID = ""
//Event Listener Productos

//Event Listener Chat

chatForm.addEventListener("submit", (e) => {
   //console.log("prueba" + input.value)
   e.preventDefault()
   let message = {
      author: {
         email: e.target.elements.email.value,
         nombre: e.target.elements.nombre.value,
         apellido: e.target.elements.apellido.value,
         edad: e.target.elements.edad.value,
         alias: e.target.elements.alias.value,
         avatar: e.target.elements.avatar.value,
      },
      text: e.target.elements.inputChat.value,
   }

   console.log(message)
   if (message.author.email.length == 0 || message.text.length == 0) {
      alert("No Puedes dejar los campos Vacios")
      e.target.elements.inputChat.focus()
   } else {
      socket.emit("chatMessage", message)
      e.target.elements.inputChat.value = ""
      e.target.elements.inputChat.focus()
      return false
   }
})

inputChat.addEventListener("keypress", () => {
   console.log(mailUser.value)
   socket.emit("typing", mailUser.value)
})
///SOCKETS

///////////////NORMALIZER

const authorSchema = new normalizr.schema.Entity("author", {}, {idAttribute: "id"})
const msgSchema = new normalizr.schema.Entity(
   "post",
   {author: authorSchema},
   {idAttribute: "_id"}
)
const schemaMsgs = new normalizr.schema.Entity(
   "posts",
   {mensajes: [msgSchema]},
   {idAttribute: "id"}
)

socket.on("mensajes", (data) => {
   typing.innerHTML = ""
   const dataSize = JSON.stringify(data).length
   console.log(data, "data")
   const denormData = normalizr.denormalize(data.result, schemaMsgs, data.entities)
   const denormSize = JSON.stringify(denormData).length
   console.log(denormData, "peso", denormSize)

   const result = parseInt((denormSize * 100) / dataSize)
   console.log(result)

   datosNorm.innerHTML = `
   <h1>Datos normalizados: ${dataSize} </h1>
   <h1>Datos des-normalizados: ${denormSize} </h1>
   <h1>Porcentaje de compresión:${100 - result}% </h1>`
   renderChat(denormData.mensajes)
})

socket.on("typing", (data) => {
   //console.log(data)
   typing.innerHTML = `<p class="text-muted m-0 p-0">${data} está escribiendo...</p>`
})

socket.on("loadProducts", (data) => {
   //console.log(data)
   renderProducts(data)
})
socket.on("newProduct", (product) => {
   //console.log(product)
   appendProduct(product)
})

const upadateProduct = (id, name, price, image, time) => {
   socket.emit("updateData", {
      id,
      name,
      price,
      image,
   })
}
socket.on("selectedProduct", (product) => {
   console.log(product)
   const name = document.getElementById("nombre")
   const price = document.getElementById("precio")
   const image = document.getElementById("image")
   //console.log(price.value)
   name.value = product.name
   price.value = product.price
   image.value = product.image

   savedID = product.id
})
///RENDER DOM

const renderChat = (data) => {
   console.log(data)

   const html = data
      .map((m) => {
         return `<div class="mensaje">
         <p id="datos" class="opacity-75 badge bg-secondary mb-1">
         <img src=${m.author.avatar} width="20" alt="" />
                       ${m.author.nombre}<span class="mx-3 text-dark badge bg-warning">${m.time}</span>
                             </p>
                             <p class="lead">${m.text}</p>
         </div>`
      })
      .join("")

   chatMessages.innerHTML = html
   chatMessages.scrollTop = chatMessages.scrollHeight
}

// DOM PRODUCTS
const renderProducts = (products) => {
   productList.innerHTML = ""
   //console.log(products)
   products.map((p) => productList.append(renderProduct(p)))
}

const renderProduct = (product) => {
   //console.log(product)
   const div = document.createElement("div")
   div.innerHTML = `
                    <div class="card card-boy rounded-0 mb-2 shadow ">
                    <div class="d-flex align-items-center justify-content-between p-2">
                    <img src="${product.image}" width="50" alt="" />
                    <h1 class="card-title">${product.name}</h1>
                    <h4>$ ${product.price}</h4>
                       <div>
                       <button class="btn btn-danger delete" data-id="${product.id}">X</button>
                       
                       </div>
                    </div>
                    </div>
                    `
   const btnDelete = div.querySelector(".delete")

   btnDelete.addEventListener("click", () => {
      //console.log("consola desde boton delete", btnDelete.dataset.id)
      deleteProduct(btnDelete.dataset.id)
   })

   //console.log(btnDelete)
   return div
}
const appendProduct = (product) => {
   //console.log(product)
   productList.append(renderProduct(product))
}

const deleteProduct = (id) => {
   console.log(id)
   socket.emit("deleteProduct", id)
}

const getProduct = (id) => {
   socket.emit("getProduct", id)
}
