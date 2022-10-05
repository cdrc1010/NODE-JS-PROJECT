const form = document.querySelector("form");
const field = document.querySelector("#fileDescription");
const file = document.querySelector("#myUpload");

function showConfirmBox() {
    document.getElementById("overlay").hidden = false;
}

function closeConfirmBox() {
    document.getElementById("overlay").hidden = true;
}
function closeConfirmBox1() {
    document.getElementById("overlay1").hidden = true;
}
function closeConfirmBox2() {
    document.getElementById("overlay2").hidden = true;
}

//MODAL CONFIRMATION BUTTON
function isConfirm() {
    closeConfirmBox();
    closeConfirmBox1();
    closeConfirmBox2();
}




//DELETE FUNCTION
function showDelete(fileID) {
    document.getElementById("overlay2").hidden = false;
    let btnDelete = document.querySelector('.deleteBtn')
    btnDelete.addEventListener('click', (e) => {
        window.location.href = `docslist/${fileID}`;
    });
}



form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (field.value == "") {
        alert("File Description is Required");
    }
    else if (file.value == "") {
        alert("File is Required")
    }
    else {
        const formData = new FormData(form);
        axios.post("http://localhost:3000/docslist", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    }
});


function showEdit(fileID) {
    document.getElementById("overlay1").hidden = false;
    let btnUpdate = document.querySelector('.updateBtn');
    let updatedLabel = document.querySelector("#updDescription");


    btnUpdate.addEventListener('click', (e) => {
        if (updatedLabel.value == "") {
            alert("Description is Required");
        }
        else {
            axios.put(`http://localhost:3000/docslist/${fileID}`, { fileDescription: updatedLabel.value }).then(response => {
                console.log(response);
            })
        location.reload();

        }

    });


}

