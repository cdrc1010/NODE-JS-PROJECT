const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e) => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email == "") {
        alert("Email is required");
        return false;
    } else if (!email.match(pattern)) {
        alert("Invalid Email");
        return false;
    } else if (password == "") {
        alert("Password is required");
        return false;
    }

    //checking if there's an existing data in localstorage
    let exist = JSON.parse(localStorage.getItem('usersList')).find(data => data.email == email && data.password == password);
    //it will serve as reference just like in firebase db.collection('collection')
    let users = JSON.parse(localStorage.getItem("usersList")) ? JSON.parse(localStorage.getItem("usersList")) : [];

    if (!exist) {
        alert("Incorrect login credentials");
    }
    else {
        alert("Login Successfully");
        let current_user = users.filter(data => {
            return data.email == email && data.password == password;
        })[0];

        //getting user and name from current_user and store it in new keys
        localStorage.setItem('name', current_user.name);
        localStorage.setItem('currentId', current_user.id);
        localStorage.setItem('email', current_user.email);
        // console.log(current_user.id);

        window.location.href = "login-success";
    }

    e.preventDefault();
});

