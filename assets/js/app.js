    $('.register').hide();

    //evento para ingresar con usuarios registrados
    $('#send-login').on('click', () => {
      const email = $('#email-login').val();
      const password = $('#password-login').val();

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
      var content = document.getElementById('content');
      content.innerHTML = `

      <p id="logout-text" >Bienvenido!</p>
      <button id="logout" class="btn btn-default" onclick="logout()">Cerrar sesión</button>
      `;
    }

    function logout() {
      firebase.auth().signOut()
        .then(function() {
          console.log('saliendo...');
          $('#register-login').show();
          $('#google-login').show();
          $('#logout').hide();
          $('#logout-text').hide();
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

    // Llamando a la data de la Api con "Fetch" (Nota: Envío el código comentado para que no choque, por si acaso...)

    /* $(document).ready(

      fetch('http://yesno.wtf/api/')
      .then(response => {
        return response.json(); // Me va a retornar un objeto "response" en formato JSON
      })
      .then(data => {
        console.log('data = ', data); // Pido que me muestre la data en la consola
      })
      .catch(error => {
        console.error('Hay un error...el servidor no quiere pasarte la data >:(');
      })); // Mensaje de error por si no puedo obtener la data del servidor

    const answer = document.getElementById('answer'); */