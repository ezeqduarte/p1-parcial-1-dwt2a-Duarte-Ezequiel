# Parcial 1 - Programacion I - Biblioteca de Discos

## Información del Autor
**Autor:** Duarte, Ezequiel

## Condiciones del Trabajo
- **Modalidad:** Individual

## Consignas de Entrega

Para la entrega del presente parcial, se debe crear un repositorio en GitHub siguiendo ciertas nomenclaturas y pautas:

- El repositorio debe ser personal y tener el nombre: `p1-parcial-1-dw[m|t|n]2[a|b|c]`.
- Dentro del README.md deben figurar todos los contribuyentes del trabajo (máximo dos personas).
- La entrega se hará a través de la tarea en Classroom proporcionando el enlace al repositorio. No se aceptará ningún otro tipo de entrega.
- En caso de incumplir con el formato del nombre, se restarán automáticamente dos puntos, pudiendo desaprobar por este error el parcial.


## Consigna del Trabajo

Se le pide crear un programa utilizando código JavaScript que permita cargar los datos de discos de una colección e ir mostrando un listado de estos.

Este parcial puede ser realizado de manera **INDIVIDUAL o en GRUPO DE 2 PERSONAS**.


### Archivos Iniciales

Cada estudiante debe comenzar con el contenido de este repositorio:

- `index.html`: contiene la estructura básica del parcial, incluyendo los botones que ya están llamando a las funciones necesarias para la acción del código. Puedes modificarlo libremente.
- `styles.css`: contiene los estilos para darle un mínimo de "diseño" al parcial. Puedes modificarlo libremente.
- `index.js`: contiene algunas líneas de código para tomar como base para el desarrollo, entre las que se encuentran:
  - Las funciones `Cargar` y `Mostrar`, que serán explicadas a continuación.
  - Un array `discos`.
  - Un modelo de la estructura del objeto disco para tomar como referencia (está comentado, pero puede servir como guía).
  Puedes comenzar con un código desde cero; no es obligatorio partir de la referencia proporcionada.
- `favicon.ico`: un favicon para mostrar en el navegador. Puedes cambiarlo libremente.

### Desarrollo

Al hacer clic en el botón "Cargar nuevo disco", se debe disparar la función `Cargar` que solicita al usuario la siguiente información de un disco:

- Nombre del disco.
- Autor o banda del disco.
- Código numérico único del disco:
  - Si el usuario ingresa un código numérico que ya ha sido cargado, se le debe pedir que ingrese otro código (hasta que ingrese uno que no haya sido utilizado previamente).

Todas las pistas del disco, donde cada pista tiene un nombre y una duración:

- La cantidad de pistas a ingresar NO debe ser fija. No se debe preguntar cuántas pistas hay que cargar, ya que el dato se desconoce.
- Al finalizar la carga de una pista, se debe confirmar si se desea ingresar otra más.
- En todo caso debe validarse que los datos ingresados sean válidos:
  - El nombre del disco, autor/banda y nombre de la pista no pueden quedar vacíos.
  - El código numérico único del disco no puede ser menor que 1 ni mayor que 999.
  - La duración de cada pista debe estar entre 0 y 7200 segundos, inclusive.

Al hacer clic en el botón "Mostrar discos", la función `Mostrar` debe mostrar cada disco con su nombre, autor/banda, código único y todas las pistas con sus respectivos datos: nombre y duración.

- Las duraciones mayores a 180 segundos deben destacarse visualmente con el color rojo.
- Utilicen al menos otras dos (2) funciones a lo largo de todo el proceso. Estas funciones deben recibir argumentos y/o devolver valores para que cuenten como funciones que suman puntos.
- Muestren un mensaje (con el método `alert`) ante cada error cometido, haciendo referencia a las validaciones.
- Informen cada vez que se muestren los discos cuántos se han cargado (contador).
- Informen por cada disco:
  - La cantidad de pistas que tiene cada disco.
  - La duración total del disco.
  - El promedio de duración de cada disco.
- Destaquen la duración total más alta entre todos los discos.
- Permitan mostrar la información de un disco específico mediante su código numérico.
