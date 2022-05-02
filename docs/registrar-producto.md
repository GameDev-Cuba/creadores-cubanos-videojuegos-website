## Cómo registrar un producto

Primero que todo, debes clonarte el repositorio y crear una rama nueva. O puedes hacer un fork del repositorio.

Si no tienes los conocimientos suficientes, puedes pedir ayuda a cualquiera de los administradores de la plataforma.

Para registrar un producto:

- Digamos que quieres registrar un juego llamado *El Avionsito Rojo*, entonces crea la carpeta `content/es/productos/el-avioncito-rojo`. El nombre de la nueva carpeta debe ser bastante amigable para las URLs.
- En la nueva carpeta, crea un fichero `index.md`. Este contiene los datos del juego.
- Además, creas una carpeta `content/es/productos/el-avioncito-rojo/assets` donde subes todas las imágenes.

El fichero `index.md` tendría un formato (Markdown) como este:

```
---
title: El Avioncito Rojo
description: Juego retro donde intentas pilotear una aereonave minúscula.
image: assets/el-avioncito-rojo-logo.jpg
tags:
    - juego
---

Este es un juego sencillo y divertido. Solo juégalo ahora mismo.

Te lo puedes descargar en Apklis:

[Descargar El Avioncito Rojo](https://apklis.cu/el-avioncito-rojo)

Déjanos tu opinión en los comentarios de Apklis.
```

Es probable que Markdown te sea familiar. Las primeras líneas contienen los metadatos del creador (`title`, `description`, `image` y `products`). El valor de `image` es relativo a la carpeta. Las imágenes deben ubicarse siempre en la carpeta `assets/`. Los tags son fijos y los debes escribir en minúscula. Estos son los tags permitidos:

- juego
- portal
- herramienta
- blog
- audiovisual
- arte
- otro

El juego puede estar en fase de desarrollo o ser ya un producto terminado.

Es requerido que un producto pertenezca a un creador o un estudio previamente registrado.

[Aprende cómo registrar un creador](registrar-creador.md)

[Aprende cómo registrar un estudio](registrar-estudio.md)

Una vez termines todas las modificaciones y adiciones, puedes publicar los mismos creando un **Pull Request** a la rama `main` del repositorio. Esta petición será revisada y aprobada por un administrador del repositorio. Debes estar atento en caso de que exista alguna sugerencia o reporte de error.