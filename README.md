# soaint
 Proyecto soaint

# Instalacion
- Clonar el repositorio 
- Ejecutar el comando 'npm i' para instalar las dependencias requeridas
- Desplegar con el comando 'npm start' el cual iniciara un servidor con la ruta 'http://localhost:3000/'
- Ejecutar en un servicio como 'Postman' los siguientes endpoint
    - De tipo GET 'http://localhost:3000/getInfo/{id}' donde {id} es el ID del registro que esta en el Archivo que se cargo en el 'http://localhost:3000/uploadFile'
    - De tipo POST 'http://localhost:3000/uploadFile' donde se subira un archivo de texto como binario con la siguiente estructura:
        Id, name, age,gender
        1,John,25,M
        2,David,37,M
        3,Jennifer,28,F
        4,Tina,23,F
        5,Patrick,43,M
