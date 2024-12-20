// Ouvinte de evento que aguarda o carregamento completo do conteúdo do DOM
document.addEventListener('DOMContentLoaded', function() {
    // Criação de um objeto de data para obter a data atual
    const hoje = new Date();
    const ano = hoje.getFullYear(); // Obtém o ano atual
    const mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês atual (0-11, por isso +1) e formata para dois dígitos
    const dia = hoje.getDate().toString().padStart(2, '0'); // Obtém o dia atual e formata para dois dígitos

    // Formata a data mínima no formato YYYY-MM-DD para uso em inputs do tipo date
    const dataMinima = `${ano}-${mes}-${dia}`;
    
    // Seleciona os campos de entrada de data no formulário
    const campoCheckIn = document.getElementById('dataCheckIn');
    const campoCheckOut = document.getElementById('dataCheckOut');
    
    // Define a data mínima nos campos de check-in e check-out
    campoCheckIn.setAttribute('min', dataMinima);
    campoCheckOut.setAttribute('min', dataMinima);

    // Função para limpar mensagens de erro
    function limparErros() {
        document.getElementById('erroCheckIn').style.display = 'none';
        document.getElementById('erroCheckOut').style.display = 'none';
    }

    // Função para exibir mensagens de erro
    function mostrarErro(campo, mensagem) {
        const spanErro = document.getElementById(campo);
        spanErro.textContent = mensagem; // Define a mensagem de erro
        spanErro.style.display = 'block'; // Torna a mensagem visível
    }

    // Ouvinte de evento para o envio do formulário de reserva
    document.getElementById('formReserva').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        limparErros(); // Limpa mensagens de erro antes de verificar entradas

        // Obtém o tipo de quarto selecionado e seu preço
        const tipoQuartoSelecionado = document.getElementById('tipoQuarto');
        const tipoQuarto = tipoQuartoSelecionado.options[tipoQuartoSelecionado.selectedIndex].text;
        const precoQuarto = parseFloat(tipoQuartoSelecionado.options[tipoQuartoSelecionado.selectedIndex].getAttribute('data-preco'));
        
        // Obtém as datas de check-in e check-out
        const dataCheckIn = new Date(document.getElementById('dataCheckIn').value);
        const dataCheckOut = new Date(document.getElementById('dataCheckOut').value);

        // Verifica se a data de check-out é posterior à data de check-in
        if (dataCheckOut <= dataCheckIn) {
            mostrarErro('erroCheckOut', 'A data de check-out deve ser posterior à data de check-in.');
            return; // Interrompe a execução se houver erro
        }

        // Calcula a diferença em dias entre check-in e check-out
        const diferencaTempo = dataCheckOut - dataCheckIn;
        const diasHospedados = diferencaTempo / (1000 * 3600 * 24); // Converte milissegundos para dias

        // Calcula o valor total do quarto
        const valorTotalQuarto = precoQuarto * diasHospedados;
        
        // Obtém o valor e descrição dos pedidos especiais
        const pedidosSelecionados = document.getElementById('pedidos');
        const valorPedidoEspecial = parseFloat(pedidosSelecionados.value);
        const descricaoPedidoEspecial = pedidosSelecionados.options[pedidosSelecionados.selectedIndex].text;

        // Calcula o valor total incluindo pedidos especiais
        const valorTotal = valorTotalQuarto + valorPedidoEspecial;

        // Formata as datas de check-in e check-out para exibição
        const dataCheckInFormatada = `${dataCheckIn.getDate().toString().padStart(2, '0')}/${(dataCheckIn.getMonth() + 1).toString().padStart(2, '0')}/${dataCheckIn.getFullYear()}`;
        const dataCheckOutFormatada = `${dataCheckOut.getDate().toString().padStart(2, '0')}/${(dataCheckOut.getMonth() + 1).toString().padStart(2, '0')}/${dataCheckOut.getFullYear()}`;

        // Exibe o resumo da reserva na interface
        document.getElementById('resumoQuarto').textContent = `Tipo de Quarto: ${tipoQuarto}`;
        document.getElementById('resumoCheckIn').textContent = `Data de Check-in: ${dataCheckInFormatada}`;
        document.getElementById('resumoCheckOut').textContent = `Data de Check-out: ${dataCheckOutFormatada}`;
        document.getElementById('resumoDias').textContent = `Dias Reservados: ${diasHospedados}`;
        document.getElementById('resumoPedidosEspeciais').textContent = `Valor dos Pedidos Especiais: R$${valorPedidoEspecial.toFixed(2)} (${descricaoPedidoEspecial})`;
        document.getElementById('resumoTotal').textContent = `Valor Total: R$${valorTotal.toFixed(2)}`;
    });

    // Função para finalizar a reserva
    window.finalizarReserva = function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        alert("Reserva finalizada com sucesso!"); // Mensagem de confirmação

        // Limpa os campos do formulário
        document.getElementById('formReserva').reset();
        document.getElementById('formCadastro').reset();
        document.getElementById('formEndereco').reset();
        document.getElementById('formDetalhes').reset();

        // Limpa os resumos exibidos na interface
        document.getElementById('resumoQuarto').textContent = '';
        document.getElementById('resumoCheckIn').textContent = '';
        document.getElementById('resumoCheckOut').textContent = '';
        document.getElementById('resumoDias').textContent = '';
        document.getElementById('resumoPedidosEspeciais').textContent = '';
        document.getElementById('resumoTotal').textContent = '';
        document.getElementById('resumoHora').textContent = '';
    };
});

document.getElementById("formEndereco").addEventListener("submit", function(event) {
    const checkbox = document.getElementById("checkbox");
    
    if (!checkbox.checked) {
        event.preventDefault(); // Impede o envio do formulário
        alert("Por favor, marque a caixa de seleção para aceitar a política de privacidade.");
    }
});

    document.addEventListener("DOMContentLoaded", () => {
        const resumoQuarto = document.getElementById("resumoQuarto");

        // Recuperar os dados do quarto selecionado
        const quartoSelecionado = JSON.parse(localStorage.getItem("quartoSelecionado"));

        if (quartoSelecionado) {
            resumoQuarto.textContent = `Quarto Selecionado: ${quartoSelecionado.nome} - R$${quartoSelecionado.preco}/noite`;
        } else {
            resumoQuarto.textContent = "Nenhum quarto selecionado.";
        }
    });
// cadastro.js

document.addEventListener("DOMContentLoaded", () => {
    const resumoQuarto = document.getElementById("resumoQuarto");
    const resumoCheckIn = document.getElementById("resumoCheckIn");
    const resumoCheckOut = document.getElementById("resumoCheckOut");
    const resumoDias = document.getElementById("resumoDias");
    const resumoPedidosEspeciais = document.getElementById("resumoPedidosEspeciais");
    const resumoTotal = document.getElementById("resumoTotal");

    const dataCheckIn = document.getElementById("dataCheckIn");
    const dataCheckOut = document.getElementById("dataCheckOut");
    const pedidos = document.getElementById("pedidos");

    // Recuperar quarto selecionado do localStorage
    const quartoSelecionado = JSON.parse(localStorage.getItem("quartoSelecionado"));

    if (quartoSelecionado) {
        resumoQuarto.textContent = `Quarto Selecionado: ${quartoSelecionado.nome} - R$${quartoSelecionado.preco}/noite`;
    } else {
        resumoQuarto.textContent = "Nenhum quarto selecionado.";
    }

    // Calcular total da estadia
    const formReserva = document.getElementById("formReserva");
    formReserva.addEventListener("submit", (event) => {
        event.preventDefault();

        // Validar as datas
        const checkInDate = new Date(dataCheckIn.value);
        const checkOutDate = new Date(dataCheckOut.value);

        if (!dataCheckIn.value || !dataCheckOut.value || checkOutDate <= checkInDate) {
            alert("Por favor, insira datas válidas de check-in e check-out.");
            return;
        }

        // Calcular dias de estadia
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        resumoCheckIn.textContent = `Data de Check-in: ${dataCheckIn.value}`;
        resumoCheckOut.textContent = `Data de Check-out: ${dataCheckOut.value}`;
        resumoDias.textContent = `Total de dias: ${diffDays}`;

        // Calcular total
        const precoQuarto = quartoSelecionado ? quartoSelecionado.preco : 0;
        const pedidoEspecial = parseFloat(pedidos.value);

        const total = (precoQuarto * diffDays) + (isNaN(pedidoEspecial) ? 0 : pedidoEspecial);

        resumoPedidosEspeciais.textContent = `Pedidos Especiais: R$${pedidoEspecial.toFixed(2)}`;
        resumoTotal.textContent = `Total: R$${total.toFixed(2)}`;
    });
});

window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");

    if (!email) {
        alert("Erro ao carregar os dados do usuário.");
        return;
    }

    const usuario = JSON.parse(localStorage.getItem(email));

    if (!usuario) {
        alert("Usuário não encontrado.");
        return;
    }

    // Preenchendo os campos com os dados do usuário
    document.getElementById("nome").value = `${usuario.firstname} ${usuario.lastname}`;
    document.getElementById("documento").value = ""; // Ajuste conforme necessário
    document.getElementById("email").value = usuario.email;
    document.getElementById("telefone").value = usuario.telefone;
};
