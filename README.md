# Gulp-boilerplate

Estructura sencilla para proyectos web estáticos con pug, sass y babel.

## Características de Gulp-boilerplate 📋

- Usa gulp para automatizar tareas
- Esta basado en Sass, Pug y ES6.
- Compila Sass con autoprefixer y muestra los cambios en tiempo real
- Compila Pug y actualiza el navegador con cada cambio
- Compila ES6 con soporte para módulos ES6 (importar y exportar modulos)
- Detecta nuevos archivos añadidos al proyecto sin tener que reiniciar gulp
- Captura errores en Sass, Pug y Js evitando que gulp se detenga.
- Crea los sourcemaps de los archivos compilados
- Tiene una estructura lista de estilos (con Sass) basada en SMACSS y ITCSS
- Tiene una estructura lista para HTML (con Pug) que divide páginas e includes.
- Tiene una estructura lista para importar y exportar modulos ES6
- Optimiza y comprime imágenes

### Estructura 📁

1. La carpeta **src** contiene la estructura de archivos con la que trabajará
2. La carpeta **public** contiene los archivos compilados que deberan llevarse a producción
3. Para Sass importe sus partials desde **styles.scss**, el orden está indicado en el mismo archivo
4. Para Pug, la carpeta **pages** contiene las paginas del proyecto y la carpeta **includes** los bloques.
5. Para Js, la carpeta **modules** contiene los módulos que serán importados desde **index.js**

## Comenzando 🚀

_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

### Pre-requisitos 📋

_Que cosas necesitas para usar el proyecto_

- Tener npm actualizado y Nodejs de preferencia v12.18.4

### Instalación 🔧

1. Cree un fork de este repositorio y clonelo en local (o descargue este repositorio por zip).
2. Ejecutar en terminal el siguiente comando para instalar Gulp: `npm install -g gulp-cli`
3. Ejecutar en terminal el siguiente comando para instalar las dependencias del proyecto: `npm install`
4. Para trabajar en desarrollo ejecute el siguiente comando: `gulp dev`

## Despliegue 📦

1. Para compilar sus archivos para producción ejecute el siguiente comando: `gulp build`
2. Subir los archivos de la carpeta **public** a tu servidor deseado

## Licencia 📄

Este proyecto está bajo la Licencia (GPL-2.0) - mira el archivo [LICENSE](LICENSE) para detalles
