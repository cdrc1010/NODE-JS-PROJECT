//MODAL 
function closeConfirmBox() {
    document.getElementById("overlay").hidden = true;
}

function isConfirm(){
    document.getElementById("overlay").hidden = true;
    
}





function showDeleteBox(fileID, sharedID) {
    document.getElementById("overlay").hidden = false;
    let btnDelete = document.querySelector('.deleteBtn')
    btnDelete.addEventListener('click', (e) => {
        console.log(fileID);
        console.log(sharedID);
        axios.get(`http://localhost:3000/share/${fileID}/${sharedID}`).then(response => {

        })
        //console.log(text.value);
        location.reload();
    });

    // console.log(userId);
}







