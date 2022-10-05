function logout() {
    localStorage.removeItem("email");
    localStorage.removeItem("currentId");
    localStorage.removeItem("name");
    window.location.href = "logout";
}