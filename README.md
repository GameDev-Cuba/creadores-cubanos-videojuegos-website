# Creadores Cubanos de Videojuegos (website)

Este repositorio contiene los códigos y recursos para generar el sitio web [Creadores Cubanos de Videojuegos](https://gamedev-cuba.netlify.app).

## Instalación

Para instalarte el sitio en tu PC, debes seguir estos pasos:

1. Instala primero `nodejs`, `npm` y `git`. De ser posible, en una versión reciente.
2. Descarga o clona este repostorio:
    ```
    git clone https://github.com/GameDev-Cuba/creadores-cubanos-videojuegos-website.git
    ```
3. Instala las dependencias:
    ```
    cd creadores-cubanos-videojuegos-website
    npm install
    ```
4. Ejecuta el generador:

    ```
    npm run build
    ```
5. En este punto, el generador crea la carpeta `www`, que es donde reside el sitio. Para verlo local, puedes ejecutar un servidor web:

    ```
    npm run www
    ```

    Y abres el navegador en [http://localhost:8000](http://localhost:8000).

Si deseas publicar algún cambio, debes seguir el siguiente flujo:

* Creas una rama nueva o haces un fork del repositorio.
* Realizas las modificaciones en tu rama.
* Publicas tu rama y haces un Pull Request a la rama `main` del repositorio original.


## Gestión de los contenido

Este sitio utiliza un generador de sitio web estático. Esto quiere decir que no provee una interfaz dedicada para agregar contenidos al mismo.

La forma para registrar un creador, estudio, producto, o cualquier otro contenido, es modificando este repositorio.

Todos los contenidos se encuentran en la carpeta `content/es`. La carpeta `es` se refiere al idioma Español.

### Atajos

Si quieres saltarte la explicación de cómo está estructurado el sitio, puedes ir a los siguientes atajos:

* [Registrar un creador](docs/registrar-creador.md)
* [Registrar un estudio de videojuegos](docs/registrar-estudio.md)
* [Registrar un producto](docs/registrar-producto.md)

### Estructura general de los contenidos

Como muchos otros generadores estáticos de sitios web, el contenido consiste en carpetas y ficheros. Cada carpeta se incluye en el sitio web final, y sus ficheros se copian tal como están o se transforman según su formato.

Este es el algoritmo a grandes rasgos:

- Se procesa la carpeta `content/es/creadores/juan-perez/`.
- Se crea una carpeta en `www` con el mismo camino: `www/creadores/juan-perez`.
- Cada carpeta debe tener un fichero `index.md`. Este se transforma en `index.html`y se copia a `www/creadores/juan-perez/index.html`.
- Si existe una carpeta `assets`, esta se copia a `www/creadores/juan-perez/assets/`.

Eso es todo, la estructura del sitio es la misma de los contenidos, y los ficheros `index.md` se transforman a `index.html`.

Por supuesto, además de los contenidos, el sitio web final contiene otras carpetas y ficheros provistos por la plantilla (`themes/default`) del proyecto.


#### Principales contenidos

Entre otras cosas, el sitio web pretende visivilizar el trabajo de la comunidad gamedev cubana, por lo que permite que puedas registrarte como creador además de listar tus trabajos.

Estos son los contenidos fundamentales en los que puedes contribuir:

#### Creadores

La carpeta `content/es/creadores/` contiene todos los creadores. Un creador puede ser lo mismo un programador, que un diseñador gráfico, que un ejecutivo, influencer, comunidador, cualquiera que tenga un rol en la creación de videojuegos.

La información general de un creador es su nombre, foto de perfil, breve descripción y presentación (que puede estar enriquecida con imágenes, enlaces, secciones). Además, puede listar los productos que ha desarrollado como creador independiente o como parte de un equipo o estudio de videojuegos.

[Aprende cómo registrar un creador](docs/registrar-creador.md).

#### Productos

La carpeta `content/es/productos/` contiene todos los productos. Los productos pueden ser videojuegos, herramientas, medios (blogs), canales en redes sociales, una colección de assets, cualquier contenido digital relacionado con el desarrollo de videojuegos.

La información general de un producto es su nombre, imágen, descripción y presentación (que puede estar enriqucida con imágenes, enlaces, secciones).

Tanto un creador como un estudio puede establecer una relación de pertenencia a un producto, referenciando al mismo en sus metadatos.

Un creador debe contar al menos con un producto terminado o en desarrollo, o estar asociado a un estudio de videojuegos.

[Aprende cómo registrar un producto](docs/registrar-creador.md).

#### Estudios de videojuegos

La carpeta `content/es/estudios/` contiene todos los estudios. Un estudio de videojuegos puede estar conformado por uno o más creadores. Un creador puede pertenecer a varios estudios (o no pertenecer a ninguno).

La información general de un estudio es su nombre, imágen, breve descripción y presentación (que puede estar enriqucida con imágenes, enlaces, secciones). En sus metadatos también se establecen los creadores que pertenecen a este estudio y los productos que el estudio ha desarrollado (o está desarrollando).

Un estudio debe contar al menos con un producto terminado o en desarrollo. Además, debe tener uno o más creadores.

[Aprende cómo registrar un estudio](docs/registrar-estudio.md).



































