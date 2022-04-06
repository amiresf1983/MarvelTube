var loginBtn = document.getElementById("login-btn");
var inputEmail = document.getElementById("Email");
var inputPassword = document.getElementById("Password");
var registerBtn = document.querySelector(".register");
// var userloginBtn = document.querySelector(".login")

function openForm() {
  $(".ui.modal").modal("show");
}
//added if statment due to code not working if code is their run if not dont run
if (loginBtn) {
  loginBtn.addEventListener("click", openForm);
}
if (registerBtn) {
  registerBtn.addEventListener("click", storeUserData);
}
//userloginBtn.addEventListener("click", storeUserData)

function storeUserData(event) {
  event.preventDefault();
  var userPassword = inputPassword.value.trim();
  var userEmail = inputEmail.value.trim();
  console.log(userEmail);
  user = {
    email: userEmail,
    password: userPassword,
  };
  if (localStorage.getItem("User") !== null) {
    var existingUser = JSON.parse(localStorage.getItem("User"));

    // localStorage.setItem('User', JSON.stringify(newUser));

    if (
      existingUser.email === userEmail &&
      existingUser.password === userPassword
    ) {
      console.log("User already exists");
      console.log(existingUser.email);
    } else {
      localStorage.setItem("User", JSON.stringify(user));
      console.log("User does not exist.Need to register");
    }
  } else {
    localStorage.setItem("User", JSON.stringify(user));
  }
  inputPassword.value = "";
  inputEmail.value = "";
}
