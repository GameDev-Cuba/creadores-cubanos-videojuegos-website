## Cómo registrar un creador

Primero que todo, debes clonarte el repositorio y crear una rama nueva. O puedes hacer un fork del repositorio.

Si no tienes los conocimientos suficientes, puedes pedir ayuda a cualquiera de los administradores de la plataforma.

Para registrar un estudio:

- Asegúrate de que ya los integrantes del estudio ya están registrados en la plataforma. Lo mismo que los productos del estudio. Un estudio debe tener al menos un producto registrado.
- Digamos que el estudio se llama Matandile Games, entonces crea la carpeta `content/es/estudios/matandile-games`. El nombre de la nueva carpeta debe ser bastante amigable para las URLs.
- En la nueva carpeta, crea un fichero `index.md`. Este contiene los datos del estudio.
- Además, creas una carpeta `content/es/estudios/matandile-games/assets` donde pones todas las imágenes que utilizarás en tu perfil.

El fichero `index.md` tendría un formato (Markdown) como este:

```
---
title: Matandile Games
description: Somos nostálgicos. Nacimos en los 80s, y creamos juegos retros.
image: assets/matandile-games-banner.jpg
team:
    - juan-perez-pu
    - maria-colibri
products:
    - el-avioncito-rojo
    - encuentra-y-aplasta
---

¡Hola! Este es nuestro equipo, Matandile Games.

Recreamos juegos de nuestra infacia. Nos apaciona el pixel art y las mecánicas retadoras.

Puedes encontrarnos en nuestra web [Matandile Games](https://matandile.games) y nuestras canales en redes sociales:

* [Twitter @MatandileGames](https://www.twitter.com/MatandileGames)
* [Facebook @MatandileGamesStudio](https://www.facebook.com/MatandileGamesStudio)
```

Es probable que Markdown te sea familiar. Las primeras líneas contienen los metadatos del estudio (`title`, `description`, `image`, `team` y `products`). El valor de `image` es relativo a la carpeta. Las imágenes deben ubicarse siempre en la carpeta `assets/`.

Los valores `el-avioncito-rojo` y `encuentra-y-aplasta`, son los nombres de las carpetas relativas a los productos (previamente registrados) *El Avioncito Rojo* y *Encuentra y Aplasta*.

[Aprende cómo registrar un producto](registrar-producto.md)

Los valores `juan-perez-pu` y `maria-colibri` son los nombres de las carpetas de los creadores Juan Perez Pu y Maria Colibri, previamente registrados.

Es requerido que un estudio tenga registrado al menos un producto y su equipo esté conformado por uno o más creadores.

[Aprende cómo registrar un creador](registrar-creador.md)

Una vez termines todas las modificaciones y adiciones, puedes publicar los mismos creando un **Pull Request** a la rama `main` del repositorio. Esta petición será revisada y aprobada por un administrador del repositorio. Debes estar atento en caso de que exista alguna sugerencia o reporte de error.