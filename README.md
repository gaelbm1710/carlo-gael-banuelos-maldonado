# Prueba tecnica para Backend
Esta prueba es el backend para servicios para gestionar productos de una tienda de comercio electrónico. 
Cuenta con un inicio de sesón y con un registro. 
# Conexion a Base de datos
La conexion y la base de datos se encuentra en MongoDB. Dentro del repositorio podrán encontrar el esquema para replicar la pequeña base de datos.
# Datos y Endpoints
Los datos son validados con la librería de Joi para que sea más facil de revisar y verificarlos. Los endpoints para los de inicio y registro de sesión tienen esta terminación **/auth/register** o **/auth/login** y el de productos es **/products**
# Pasos para replicar el proyecto
Ejecutamos el comando 
```
yarn init
```
o 
```
npm init
```
Despues descargamos todas las dependencias podemos utilizar dependiendo sea el caso con Node.JS 
```
npm install
```
o si utilizamos Yarn como gestor de dependencias utilizamos
```
yarn install
```
**Es necesaria la instalación de todas las Dependencias que hay en el proyecto para replicarlas**

# Comandos para Iniciar el proyecto
Para iniciar el proyecto puede ejecutar 2 comandos, uno es con Node y otro es con Nodemon
```
yarn start 
```
o 
```
yarn dev
```
También funciona con npm en caso de no contar con el gestor de dependencias Yarn. Los comandos serían: 
```
npm run start
```
o 
```
npm run dev
```
