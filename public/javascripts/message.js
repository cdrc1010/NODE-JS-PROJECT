//initialize
const sendMessage = document.querySelector('#txtSend');
const msgtoSend = document.querySelector('#msgs');


sendMessage.addEventListener('click', (e) => {
    e.preventDefault();
    if (msgtoSend.value == "") {
        alert("Message is Required");
    }
    else {
        axios.post("http://localhost:3000/chat", { message: msgtoSend.value }).then(response => {
        })
        location.reload();

    }
});

const refresh = () => {
    location.reload();
}