# Desafío MOCKS y NORMALIZACIÓN

El desarrollo del backend de la api está dentro de la carpeta backend.

##### Inicializar desde la consola dentro de la carpeta backend con:

-  **npm run start:** inicializa el proyecto

El proyecto está dividido en el uso de dos base de datos para las consignas...

## MOCKS Productos

-  base de datos "eCommerce" mysql corriendo en servidor localhost por medio de XAMPP
-  para genererar los productos se utiliza la ruta post /api/productos-test
-  Para prueba utilice postman. POST /api/productos-test

## Chat Cambios

-  Se cambio el formato de los mensajes al nuevo pedido en la consigna.
-  Para la persistencia del chat se esta utilizando fileSystem. Esto con la finalidad de aplicar la normalización de datos en los objetos anidados.

El proyecto está dividio en dos grupos de rutas desde http://localhost:8080

### Git Ignore

> > > node modules y archivos .DIR

### Dependencies

-  Para el servidor, manejo de rutas [Express JS](https://expressjs.com/es/ "Ver más")
-  Para el render del frontend [Express Handlebars](https://www.npmjs.com/package/express-handlebars "Ver más")
-  Para la inicializacion e implementación de las querys [Knex JS](https://momentjs.com/ "Ver más")
-  Para el timestamp y fechas [Moment JS](https://momentjs.com/ "Ver más")
-  Para la implementación de mysql [mysql](https://momentjs.com/ "Ver más")
-  Para la normalización de objetos anidados en la instancia de mensajes [normalizr](https://www.npmjs.com/package/normalizr "Ver más")
-  Para la configuracion del servidor y la comunicación entre el backend y frontend [socket io](https://socket.io/ "Ver más")

-  Se utilizó la dependencia de dotenv para la implementacion y uso de variables de entorno .env [dotenv](https://www.npmjs.com/package/dotenv "Ver más")

#### Created by: **Ivan Hernández Preza**
