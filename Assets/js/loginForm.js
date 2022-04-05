
var loginBtn = document.getElementById("login-btn")
var inputEmail = document.getElementById("Email")
var inputPassword = document.getElementById("Password")
var registerBtn = document.querySelector(".register")
// var userloginBtn = document.querySelector(".login")


function openForm() {
    $('.ui.modal')
        .modal('show')
        ;
}
loginBtn.addEventListener("click", openForm)
registerBtn.addEventListener("click", storeUserData)
//userloginBtn.addEventListener("click", storeUserData)

function storeUserData(event) {
    event.preventDefault()
    var userPassword = inputPassword.value.trim()
    var userEmail = inputEmail.value.trim();
    console.log(userEmail)
    user = {
        email: userEmail,
        password: userPassword
    }
    if (localStorage.getItem("User") !== null) {
        var newUser = [];
        // var existingUser = JSON.parse(localStorage.getItem("User"))
        var existingUser = localStorage.getItem("User")

        console.log(existingUser)
        console.log(existingUser.email)
        newUser = [existingUser];
        newUser.push(user);
        console.log(newUser)
        console.log(existingUser.length);
        localStorage.setItem('User', JSON.stringify(newUser));
        // for (var i = 0; i < existingUser.length; i++) {
        //     if ((existingUser[0].email === userEmail) && (existingUser[0].password === userPassword)) {
        //         console.log("User already exists")
        //         console.log(existingUser[0].email)
        //     }
        //     else {
        //         newUser = [existingUser];
        //         newUser.push(user);
        //         localStorage.setItem('User', JSON.stringify(newUser));
        //         console.log("User does not exist.Need to register")
        //     }
        // }
    } else {
        localStorage.setItem('User', JSON.stringify(user))
    }
    inputPassword.value = ""
    inputEmail.value = ""



}
