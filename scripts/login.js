function onLoad()
{
  const users = new User();

  users.createUser("John", "johnsPassword","john@gmail.com");
  users.createUser("Max", "maxsPassword","max123@gmail.com");
  users.createUser("Manager", "managersPassword","manager@gmail.com");
};

function loginButton() {
  const users = new User();
  const session = new Session();

  var errors = document.getElementById("l-errors");
  var username = document.getElementById("l-username");
  var password = document.getElementById("l-password");

  //this checks the user accounts for the username, and checks their password too
  if(users.getUser(username.value).Name  == "Manager" && users.getUser(username.value).Password == password.value){
      document.location.replace("Manager.html");
  }
  else if(users.getUser(username.value) != null) {
    if(users.getUser(username.value).Password == password.value)
    {
      //this sets the "currentUser" variable to who you successfully signed in as
      session.set("currentUser", users.getUser(username.value));
      //this redirects to another page
      document.location.replace("home.html");
      errors.innerHTML = "";
    }
    else
    {
      //this sets an error message if the login failed
      errors.innerHTML = "Incorrect password";
    }
  }
  else {
    //this sets an error message if the login failed
    errors.innerHTML = "User not found";
  }
};

function signupButton() {
  const users = new User();
  const session = new Session();

  var errors = document.getElementById("s-errors");
  var username = document.getElementById("s-username");
  var email = document.getElementById("s-email");
  var password = document.getElementById("s-password");

  //this checks the user accounts for the username, and checks their password too
  if(users.getUser(username.value) != null) {
    errors.innerHTML = "User already exists";
  }
  else {
    if(validateEmail(email.value))
    {
      var newUser = users.createUser(username.value, password.value, email.value);
      session.set("currentUser", newUser);
      //this redirects to another page
      document.location.replace("home.html");
    }
    else
    {
      errors.innerHTML = "Invalid email address";
    }
  }
};

// login/ signup toggle
$('.btn-group a button').click(function(){
  $('.btn-group > div').hide();
 $('.btn-group > div').eq($(this).parent().index()).show();
});

$('#pwd').click(function(){
  $('.forgotpwd').show();
 $('.login').hide();
 $('.signup').hide();
});

// manager login
$('#manager').click(function(){
  $(this).hide();
  $('.login').show();
});


// View Menu
function openMenu() {
  document.getElementById("viewMenu").style.width = "100%";
}
// Close Menu
function closeMenu() {
  document.getElementById("viewMenu").style.width = "0";
}
// Order Now
function orderNow(){
    document.getElementById("on").remove();
    document.getElementById("ordernow").style.visibility = "visible";
    document.getElementById("line").style.visibility = "hidden";
    document.getElementById("on").style.color = "lightgray";
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
