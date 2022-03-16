import moment from "moment"

const date = moment().format("D-MMM-YY,h:mm a")
const formatoMensaje = (mail, nombre, apellido, edad, alias, avatar, text) => {
   return {
      author: {
         id: mail,
         nombre: nombre,
         apellido: apellido,
         edad: edad,
         alias: alias,
         avatar: avatar,
      },
      text: text,
      time: date,
   }
}

export default formatoMensaje
