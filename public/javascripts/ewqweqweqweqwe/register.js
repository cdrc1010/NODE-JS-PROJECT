const regForm = document.querySelector('#registerForm');

//EMPTY ARRAYS IT IS USE TO STORE MULTIPLE DATA OR OBJECT INTO ARRAY
let users = JSON.parse(localStorage.getItem("usersList")) ? JSON.parse(localStorage.getItem("usersList")) : [];
// console.log(users); FOR CHECKING PURPOSES

regForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let fName = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cPass = document.getElementById("cpassword").value;
    let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //OBJECT TO BE PUSH IN ARRAY SO PUSH METHOD IS ONLY IN ARRAY
    let user = {
        id: Math.floor(Math.random() * 10000),
        name: fName,
        email: email,
        password: password
    };

    if (fName == "") {
        alert("Name is required");
        return false;
    } else if (email == "") {
        alert("Email is required");
        return false;
    } else if (password == "") {
        alert("Password is required");
        return false;
    } else if (cPass == "") {
        alert("Confirm Password is required");
        return false;
    } else if (password != cPass) {
        alert("Password does not match!");
        return false;
    } else if (!email.match(pattern)) {
        alert("Invalid Email!");
        return false;
    } else {

        //PUSHING OBJECT INTO ARRAY
        users.push(user);
        localStorage.setItem("usersList", JSON.stringify(users));
        alert("Registration Successful!");
        regForm.reset();
        window.location.href = "register-successful";
        return true;
    }
});