## Cómo registrar un creador

Primero que todo, debes clonarte el repositorio y crear una rama nueva. O puedes hacer un fork del repositorio.

Si no tienes los conocimientos suficientes, puedes pedir ayuda a cualquiera de los administradores de la plataforma.

Para registrarte como creador:

- Digamos que te llamas Juan Pérez Pu, entonces crea la carpeta `content/es/creadores/juan-perez-pu`. El nombre de la nueva carpeta debe ser bastante amigable para las URLs.
- En la nueva carpeta, crea un fichero `index.md`. Este contiene tus datos.
- Además, creas una carpeta `content/es/creadores/juan-perez-pu/assets` donde subes todas las imágenes que utilizarás en tu perfil.

El fichero `index.md` tendría un formato (Markdown) como este:

```
---
title: Juan Pérez Pu
description: Diseñador gráfico y programador.
image: assets/mi-foto-perfil.jpg
products:
    - la-rana-corredora
    - libro-godot-en-cubano
---

Soy diseñador de profesión.
He colaborado en diferentes proyectos de videojuegos,
sobre todo en el ámbito de los juegos educativos.

También me fascina el mundo de la programación de
videojuegos. Mis conocimientos en el campo me han
servido para agilizar la producción de los juegos y
la colaboración con los demás colegas.

Puedes contactar conmigo en:

* [Twitter @juanpp](https://www.twiiter.com)
* [Facebook @JuanPerezPu](https://www.facebook.com/JuanPerezPu)
```

Es probable que Markdown te sea familiar. Las primeras líneas contienen los metadatos del creador (`title`, `description`, `image` y `products`). El valor de `image` es relativo a la carpeta. Las imágenes deben ubicarse siempre en la carpeta `assets/`.

Los valores `la-rana-corredora` y `libro-godot-en-cuba`, son los nombres de las carpetas relativas a los productos (previamente registrados) *La rana corredora* y *Godot en cubano*.

[Aprende cómo registrar un producto](registrar-producto.md)

Es requerido que un creador pertenezca a un estudio o sea autor (co-autor) de algún producto terminado o en desarrollo.

[Aprende cómo registrar un estudio](registrar-estudio.md)

Una vez termines todas las modificaciones y adiciones, puedes publicar los mismos creando un **Pull Request** a la rama `main` del repositorio. Esta petición será revisada y aprobada por un administrador del repositorio. Debes estar atento en caso de que exista alguna sugerencia o reporte de error.