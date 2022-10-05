const urlSearchParams = new URLSearchParams(window.location.search);
let user_id = urlSearchParams.get('userID');
let button = document.querySelectorAll('.btnEdit');
let arr = JSON.parse(localStorage.getItem('usersList'));

//REFERENCE TO USERSLIST AND THEN FIND THE VALUE OF USER ID FROM THE ADDRESS BAR  AND NATCH IT TO THE USERLIST COLLECTION THEN RETURN IT
let filtered_user = arr.filter((item) => {
    return user_id == item.id
});

// STORE THE FILTERED USER TO USER AND THEN GET THE INDEX OF ARRAY WHICH HAS THE 0 INDEX, IT CONTAINS THE OBJECT
let user = filtered_user[0];
//IT SERVE AS A GUIDE IT WILL PRINT THE FILTERED ARRAY
//console.log(user);

let newFullname = document.querySelector('#fullName');
let newEmail = document.querySelector('#email');
newFullname.value = user.name;
newEmail.value = user.email;

//SELF-INVOKED FUNCTION
(function () {
    let btn_save = document.querySelector('.saveBtn')
    if (btn_save) {
        btn_save.addEventListener('click', (e) => {
            // console.log('test'); FOR CHECKING PURPOSES

            let newName = document.getElementById("fullName").value
            let newEmail = document.getElementById("email").value

            user.name = newName
            user.email = newEmail

            localStorage.setItem("usersList", JSON.stringify(arr));


            window.location.href = "user-list";

        })
    }
})();