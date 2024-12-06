document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;

    if (!email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Recuperando dados do localStorage
    const usuario = JSON.parse(localStorage.getItem(email));

    if (!usuario || usuario.senha !== senha) {
        alert("Email ou senha inválidos!");
        return;
    }

    // Redirecionando para a próxima página com os dados na URL
    window.location.href = `finalizacao.html?email=${encodeURIComponent(email)}`;
});
