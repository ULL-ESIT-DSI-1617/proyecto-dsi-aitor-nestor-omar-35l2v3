[![Build Status](https://travis-ci.org/ULL-ESIT-DSI-1617/proyecto-dsi-aitor-nestor-omar-35l2v3.svg?branch=master)](https://travis-ci.org/ULL-ESIT-DSI-1617/proyecto-dsi-aitor-nestor-omar-35l2v3)
[![MongoDB](https://img.shields.io/badge/mongodb-v3.4.4-green.svg)]()
[![AllContributors](https://img.shields.io/badge/all_contributors-3-blue.svg?style=flat-square)](#contributors)


# Proyecto: Timeline de eventos

Proyecto final para la asignatura Desarrollo de Sistemas Informáticos ([DSI - ULL](https://campusvirtual.ull.es/1617/course/view.php?id=1136)), en el que hemos realizado una aplicación basada en una timeline donde el usuario podrá tener una serie de eventos que quiera recordar (como si de un calendario se tratase), que quedarán recogidos en una base de datos con su perfil de usuario.

* Enlace al despliegue de la aplicación en [IaaS](http://10.6.128.26:8090/login) para demo.

## Tecnologías utilizadas en el proyecto
Nos hemos basado en la gran mayoría de las tecnologías vistas en el curso de la asignatura, llegando a utilizar la gran mayoría de ellas:
* [NodeJS](https://nodejs.org/es/), [ExpressJS](https://expressjs.com/)
* [Cookies](https://www.codementor.io/noddy/cookie-management-in-express-js-du107rmna) y [sessions](http://www.codexpedia.com/node-js/a-very-basic-session-auth-in-node-js-with-express-js/) en ExpressJS
* [Passport](http://passportjs.org/)
* Pruebas ([Mocha](https://mochajs.org/), [Should](https://shouldjs.github.io/), [Travis](https://travis-ci.com/))
* [Vistas EJS](http://www.embeddedjs.com/getting_started.html)
* [Gulp](http://gulpjs.com/)
* [BootStrap](http://getbootstrap.com/)
* [MongoDB](https://www.mongodb.com/es), [Mongoose](http://mongoosejs.com/)
* Autenticación y encriptación de contraseñas (Twitter y GitHub)
* [Pjax](https://www.npmjs.com/package/pjax)


### Registro del usuario

El usuario debe registrarse en el sistema para utilizar la plataforma y poder guardar sus eventos, ya que sin registrarse, le es imposible acceder a la plataforma.

Una vez se haya registrado correctamente *(user y password)*, estas credenciales se guardarán en la base de datos con un **id** asociado al usuario, para luego acceder automáticamente a la plataforma.

![](https://goo.gl/48nH0O)


### Login del usuario

Una vez el usuario se haya registrado en la plataforma, solo tiene que introducir sus credenciales en el apartado de **Login** para poder acceder a la plataforma.

![](https://media.giphy.com/media/w4FVFCvrDnruU/giphy.gif)

* También se ha implementado el acceso mediante **Twitter** y **GitHub**, pero por motivos de seguridad, hemos quitado las credenciales de acceso por defecto, por lo para comprobar que el servicio funciona, se debe acceder al código, concretamente en [/config/auth.js](https://github.com/ULL-ESIT-DSI-1617/proyecto-dsi-aitor-nestor-omar-35l2v3/blob/master/config/auth.js) y modificar las claves de Twitter y GitHub.

```javascript

module.exports = {
  
    'twitterAuth' : {
      
      consumerKey: 'your-consumer-key-here',
      consumerSecret: 'your-consumer-secret-here',
      callbackURL: 'http://localhost:3001/login/twitter/return'  
      
    },
        
    'githubAuth' : {
      
      clientID: 'your-secret-clientID-here',
      clientSecret: 'your-secret-client-here',
      callbackURL: "http://localhost:3001/login/github/return"
        
    }
};
```

### Creación de eventos
Para crear un evento, en la página principal de su timeline, podrá ver un botón llamado **Crear Evento**, el cual lleva a un formulario para introducir los elementos del evento *(título, día, mes, año y descripción)*, donde dándole al botón **Guardar**, se le mostrará el evento al usuario en su timeline.
![](https://media.giphy.com/media/11EJMbtipZ3etG/giphy.gif)

Hemos implementado que los eventos se muestren alternándose de izquierda a derecha, para que sea más fácil identificar los eventos y poder leerlos mejor.

![](https://media.giphy.com/media/3phEAOtbGruVi/giphy.gif)

### Edición y eliminación de eventos
Dentro de cada evento, se mostrarán dos botones, uno de **Editar** y otro de **Eliminar**. El primero, como nos dice, nos permitirá editar la información de cualquier evento, donde se nos muestra una ventana flotante con la información que podremos editar.

![](https://media.giphy.com/media/Pgm4WKsey7jeE/giphy.gif)

El siguiente botón, llamado **Eliminar**, nos borrará de la timeline el evento que necesitemos, ya sea porque ya se ha cumplido ese evento o por cualquier necesidad del usuario.

![](https://media.giphy.com/media/UG0h9O5W4cOT6/giphy.gif)

### Filtrado de eventos

También se ha implementado un filtro de eventos, ya que si el usuario tiene una gran cantidad de eventos en su timeline, le será más cómodo poder buscar eventos a partir de una determinada fecha.

![](https://media.giphy.com/media/13pR3P8ewRcmWI/giphy.gif)

### Perfil de usuario y logout

El usuario tendrá un apartado **Perfil**, donde podrá cambiar su contraseña por una nueva, volver a la timeline o directamente hacer un logout de la plataforma.

![](https://media.giphy.com/media/kUnTaJt5kag2Q/giphy.gif)

## Autores del proyecto
* [Aitor Bernal Falcón](https://chinegua.github.io/)
* [Néstor García Moreno](https://nestor-gm.github.io/)
* [Omar Mendo Mesa](https://ozzrocker95.github.io/)
