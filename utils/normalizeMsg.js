import {normalize, schema} from "normalizr"

const schemaAuthor = new schema.Entity("author", {}, {idAttribute: "email"})

const schemaMensaje = new schema.Entity(
   "post",
   {author: schemaAuthor},
   {idAttribute: "id"}
)

const schemaMensajes = new schema.Entity(
   "posts",
   {mensajes: [schemaMensaje]},
   {idAttribute: "id"}
)

const normalizeMsgs = (mensajes) =>
   normalize({id: "mensajes", mensajes: mensajes}, schemaMensajes)

export default normalizeMsgs
