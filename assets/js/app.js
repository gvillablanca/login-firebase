    $('.register').hide();
    $('#answer').hide();

    $('#cors').on('click', () => {

      const cors = $('#cors');
      $('.login').hide();
      $('.register').hide();
      $('#answer').show();
    });

    //evento para ingresar con usuarios registrados
    $('#send-login').on('click', () => {
      const email = $('#email-login').val();
      const password = $('#password-login').val();
      if (email === 0 || email === null || email === '') {
        return alert('Hey, espera! \n Debes escribir tu mail de usuario');
      }
      if (password === 0 || password === null || password === '') {
        return alert('También debes escribir tu contraseña');
      }

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
      viewer();
    });

    function viewer() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          isVisible();
          $('#register-login').hide();
          $('#google-login').hide();
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
        } else {
          console.log('usuario no existente');
        }
      });
    }

    function isVisible() {
      //en esta seccion iria a la vista sus secciones con su contenido, y se ocultaria el login
      $('.login').hide();
      $('#answer').show();
    }

    function logout() {
      firebase.auth().signOut()
        .then(function() {
          console.log('saliendo...');
          $('#register-login').show();
          $('#google-login').show();
          $('#logout').hide();
          $('#logout-text').hide();
          $('.login').show();
          $('#answer').hide();
        })
        .catch(function(error) {
          console.log(error);
        })
    }

    $('#register-login').on('click', () => {
      $('.register').show();
      $('.login').hide();
    });

    // evento para registrar usuarios
    $('#send').on('click', () => {
      const email2 = $('#email-register').val();
      const password2 = $('#password-register').val();

      //  paso 1 registrar usuarios
      firebase.auth().createUserWithEmailAndPassword(email2, password2).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        viewer();
      });
    });

    $('#home').on('click', () => {
      $('.register').hide();
      $('.login').show();
    });


    //Función para llamar a la API y visualizar su contenido
    $(document).ready(() => {
      /*
       *Se carga el documento, al hacer click en el botón la página empezará a tomar los datos de la API utilizando fetch
       */
      $('#generarAnswer').click(() => {

        fetch('http://yesno.wtf/api/')
          .then(response => {
            return response.json(); //retorna un objeto response en formato JSON
          })
          .then(data => {
            showAnswer(data); // llamamos a la funcion que nos mostrará la imágen de la data en la página
          })
          .catch(error => {
            alert('Hubo un error en la API'); // Mensaje de error
          })

        $('.imageResponse').empty();
      })
    });

    function showAnswer(data) {
      $('#answer').append(`<div class="container"><div class="row imageResponse">
          <div class="col-lg-6 col-md-6 col-sm-8 col-xs-8 col-lg-offset-3 col-md-offset-3  col-sm-offset-2 col-xs-offset-2">
            <img src="${data.image}">
          </div>
        </div>
        </div></div>`);
    }