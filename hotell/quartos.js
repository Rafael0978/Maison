    function selecionarQuarto(nome, preco) {
        const quartoSelecionado = {
            nome: nome,
            preco: preco
        };
        localStorage.setItem("quartoSelecionado", JSON.stringify(quartoSelecionado));
        // Redirecionar para a página de cadastro
        window.location.href = "finalizacao.html";
    }
