    $('.register').hide();

    //evento para ingresar con usuarios registrados
    $('#send-login').on('click', ()=>{
      const email = $('#email-login').val();
      const password = $('#password-login').val();

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;     
      });
      viewer();
    });

    function viewer(){
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          isVisible();
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

    function isVisible(){
      var content = document.getElementById('content');
      content.innerHTML = 'solo lo ve usuario existente';
    }

    $('#register-login').on('click', ()=>{
      $('.register').show();
      $('.login').hide();
    });

    // evento para registrar usuarios
    $('#send').on('click', ()=>{
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

    $('#home').on('click', ()=>{
      $('.register').hide();
      $('.login').show();
    });

