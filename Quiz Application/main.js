document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const typedUser = document.getElementById('username').value;
    const typedPass = document.getElementById('password').value;
    const message = document.getElementById('message');

    const fixedUser = "admin";
    const fixedPass = "12345";

    if (typedUser === fixedUser && typedPass === fixedPass) {
        let isFirstTime = localStorage.getItem("quizUserStarted");
        if (!isFirstTime) {
            localStorage.setItem("quizUserStarted", "true");
            alert("Welcome! This is your first time playing Quiz Master.");
        } else {
            alert("Login Successful! Welcome back.");
        }
        window.location.href = "quiz.html";
    } else {
        message.innerText = "Incorrect Username and Password!";
    }
});









