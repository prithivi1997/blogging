var firebaseConfig = {
    apiKey: "AIzaSyAHDj-xg0gmg8uWpXgNiC93_ANMli7oZMw",
    authDomain: "blogs-app-1a880.firebaseapp.com",
    databaseURL: "https://blogs-app-1a880-default-rtdb.firebaseio.com",
    projectId: "blogs-app-1a880",
    storageBucket: "blogs-app-1a880.appspot.com",
    messagingSenderId: "360258898345",
    appId: "1:360258898345:web:d7d57c00b9f6a5f6f91cb8",
    measurementId: "G-HLYVJ45ZJE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;
  
  $("#btn-signin").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      
      if(email != "" && password !="")
      {
        var result = firebase.auth().signInWithEmailAndPassword(email,password);

        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message :" + errorMessage);
          
        });
      }
      else
      {
          window.alert("Form is incomplete. please fill out all field.");
      }
  });



  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmpassword").val();
      
      
      if(email != "" && password !="" && cPassword !="")
      {
        if(password == cPassword)
        {
            var result = firebase.auth().createUserWithEmailAndPassword(email,password);

            result.catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
    
                console.log(errorCode);
                console.log(errorMessage);
    
                window.alert("Message :" + errorMessage);
              
            });   
        }
        else
        {
            window.alert("password do not match with the confirm password.");
        }
       
      }
      else
      {
          window.alert("Form is incomplete. please fill out all field.");
      }
  });



  $("#btn-resetpassword").click(function()
  {
    var auth = firebase.auth();
    var email = $("#email").val();

    if(email != "")
    {
        auth.sendPasswordResetEmail(email).then(function()
        {
            window.alert("email has been sent to you, Please check and verify.");
        })
        .catch(function(error)
        {
            var errorCode = error.code;
                var errorMessage = error.message;
    
                console.log(errorCode);
                console.log(errorMessage);
    
                window.alert("Message :" + errorMessage);
        });
    }
    else
    {
        window.alert("Please write your email first.");
    }
  });



  $("#btn-logout").click(function()
  {
     firebase.auth().signOut();
  });


  $("#btn-update").click(function()
  {
      var phone = $("#phone").val();
      var address = $("#address").val();
      var bio = $("#bio").val();
      var fname = $("#firstname").val();
      var lname = $("#lastname").val();
      var country = $("#country").val();
      var gender = $("#gender").val();
      
      var rootRef = firebase.database().ref().child("Users");
      var userID = firebase.auth().currentUser.uid;
      var usersRef = rootRef.child(userID);

      if(fname!="" && lname!="" && phone!="" && country!="" && gender!="" && bio!="" && address!="")
      {
          var userData =
          {
            "phone": phone,
            "address": address,
            "bio": bio,
            "firstname": fname,
            "lastname": lname,
            "country": country,
            "gender" :gender,
          };

          usersRef.set(userData, function(error)
          {
              if(error)
              {
                var errorCode = error.code;
                var errorMessage = error.message;
    
                console.log(errorCode);
                console.log(errorMessage);
    
                window.alert("Message :" + errorMessage);
              }
              else
              {
                window.location.href = "main.html" 
              }

          });
      }
      else
      {
        window.alert("Form is incomplete. please fill out all field.");
      }
  });

  function switchView(view) 
  {
        $.get({
            url:view,
            cache:false,
        })  
        .then(function(data){
            $("#container").html(data);
        });  
  }