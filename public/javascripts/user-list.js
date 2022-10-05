//MODAL
// function showConfirmBox(userId) {
//     document.getElementById("overlay").hidden = false;
//     let btnDelete = document.querySelector('.deleteBtn')
//     btnDelete.addEventListener('click', (e) => {
//         window.location.href=`user-list/${userId}`;
//     });

//     // console.log(userId);
// }

function showConfirmBox(userId) {
    document.getElementById("overlay").hidden = false;
    let btnDelete = document.querySelector('.deleteBtn')
    btnDelete.addEventListener('click', (e) => {
        axios.delete(`http://localhost:3000/user-list/${userId}`).then(response => {
            console.log(response);
        })
        // console.log(text.value);
        location.reload();
    });

    // console.log(userId);
}
function closeConfirmBox() {
    document.getElementById("overlay").hidden = true;
}

function isConfirm(answer) {
    if (!answer) {
        alert("Cancelled!");
         closeConfirmBox();
    } 
   
}