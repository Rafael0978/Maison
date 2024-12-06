class Usuario {
    constructor(firstname, lastname, telefone, email, senha) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.telefone = telefone;
        this.email = email;
        this.senha = senha;
    }
}

document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtendo os valores dos campos
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!firstname || !lastname || !telefone || !email || !senha) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Criando objeto do usuário
    const usuario = new Usuario('duda', 'araujo', 1199, 'd@f', 'bola');

    // Armazenando no localStorage
    localStorage.setItem(email, JSON.stringify(usuario));

    // Redirecionando para a próxima página com os dados na URL
    window.location.href = `finalizacao.html?email=${encodeURIComponent(email)}`;
});
