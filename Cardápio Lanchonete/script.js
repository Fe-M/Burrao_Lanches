const produtos = [
    {
        id: 1,
        nome: "X-TUDO",
        categoria: "Lanches",
        descricao: "Pão, hambúrguer, ovo, bacon, salsicha, presunto, milho, alface, tomate, cebola, queijo e molho especial.",
        preco: 30.00,
        disponivel: true
    },
    {
        id: 2,
        nome: "X-Burrão",
        categoria: "Lanches",
        descricao: "Pão, hambúrguer de carne maluca, bacon em fatias, queijo cheddar, alface americana, tomate e cebola caramelizada no shoyu.",
        preco: 25.00,
        disponivel: true
    },
    {
        id: 3,
        nome: "X-Bacon",
        categoria: "Lanches",
        descricao: "Pão, hambúrguer, queijo e bacon crocante.",
        preco: 23.00,
        disponivel: false
    },
    {
        id: 4,
        nome: "Refrigerante",
        categoria: "Bebidas",
        descricao: "Refrigerante gelado de 350ml.",
        preco: 7.00,
        disponivel: true
    },
    {
        id: 5,
        nome: "Suco Natural",
        categoria: "Bebidas",
        descricao: "Suco natural de laranja.",
        preco: 8.00,
        disponivel: true
    },
    {
        id: 6,
        nome: "Cerveja",
        categoria: "Bebidas",
        descricao: "Cerveja gelada de 350ml.",
        preco: 7.00,
        disponivel: true
    },
    {
        id: 7,
        nome: "Pudim",
        categoria: "Sobremesas",
        descricao: "Pudim de leite condensado.",
        preco: 8.00,
        disponivel: true
    },
    {
        id: 8,
        nome: "Sorvete",
        categoria: "Sobremesas",
        descricao: "Sorvete de chocolate.",
        preco: 10.00,
        disponivel: false
    },
    {
        id: 9,
        nome: "Brownie",
        categoria: "Sobremesas",
        descricao: "Brownie de chocolate com cobertura.",
        preco: 12.00,
        disponivel: true
    }
];

const catalogo = {
    nome: "Lanchonete do Burrão",
    itens: produtos,

    adicionar: function(item) {
        this.itens.push(item);
    },

    contar: function() {
        return this.itens.length;
    }
};


 // ==========================================
 // R2 - RENDERIZAÇÃO DINÂMICA DOS PRODUTOS
 // ==========================================

function renderizarProdutos(lista) {

    const container = document.getElementById("listaProdutos");

    container.innerHTML = "";

    if (lista.length === 0) {
        container.textContent = "Nenhum produto encontrado.";
        return;
    }

    for (let i = 0; i < lista.length; i++) {

        const produto = lista[i];

        const card = document.createElement("div");
        card.classList.add("card-produto");

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + produto.categoria;

        const descricao = document.createElement("p");
        descricao.textContent = produto.descricao;

        const preco = document.createElement("p");
        preco.textContent = "Preço: " + produto.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        const status = document.createElement("p");
        status.textContent = produto.disponivel
            ? "Disponível"
            : "Indisponível";

        status.classList.add(
            produto.disponivel ? "disponivel" : "indisponivel"
        );

        const botao = document.createElement("button");
        botao.textContent = produto.disponivel
            ? "Marcar como indisponível"
            : "Marcar como disponível";

        botao.classList.add("botao-status");
        botao.dataset.id = produto.id;

        card.appendChild(titulo);
        card.appendChild(categoria);
        card.appendChild(descricao);
        card.appendChild(preco);
        card.appendChild(status);
        card.appendChild(botao);

        container.appendChild(card);
    }
}


// ==========================================
// R3 - PESQUISA E FILTROS
// ==========================================

function pesquisarProdutos() {

    const campoBusca = document.getElementById("busca");
    const campoCategoria = document.getElementById("categoria");

    const textoBusca = campoBusca.value.toLowerCase();
    const categoriaSelecionada = campoCategoria.value;

    const encontrados = [];

    for (let i = 0; i < catalogo.itens.length; i++) {

        const produto = catalogo.itens[i];

        const nomeProduto = produto.nome.toLowerCase();

        const correspondeNome = nomeProduto.includes(textoBusca);

        const correspondeCategoria =
            categoriaSelecionada === "Todas" ||
            produto.categoria === categoriaSelecionada;

        if (correspondeNome && correspondeCategoria) {
            encontrados.push(produto);
        }
    }

    renderizarProdutos(encontrados);
}

// Evento de pesquisa

document.getElementById("busca").addEventListener("input", function() {
    pesquisarProdutos();
});

// Evento de filtro

document.getElementById("categoria").addEventListener("change", function() {
    pesquisarProdutos();
});


// ==========================================
// R4 - CADASTRO DE NOVOS PRODUTOS
// ==========================================

const formulario = document.getElementById("formProduto");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const categoria = document.getElementById("categoriaNova").value;

    const descricao = document.getElementById("descricao").value.trim();

    const preco = Number(document.getElementById("preco").value);

    const mensagem = document.getElementById("mensagem");

    // Validação dos campos

    if (nome === "" || categoria === "" || descricao === "") {

        mensagem.textContent = "Preencha todos os campos.";
        mensagem.className = "erro";

        return;
    }

    if (!Number.isFinite(preco) || preco <= 0) {

        mensagem.textContent = "Digite um preço válido.";
        mensagem.className = "erro";

        return;
    }

    // Criando um novo identificador

    let novoId = 1;

    for (let i = 0; i < catalogo.itens.length; i++) {

        if (catalogo.itens[i].id >= novoId) {
            novoId = catalogo.itens[i].id + 1;
        }
    }

    // Criando o novo produto

    const novoProduto = {
        id: novoId,
        nome: nome,
        categoria: categoria,
        descricao: descricao,
        preco: preco,
        disponivel: true
    };

    // Adicionando ao catálogo

    catalogo.adicionar(novoProduto);

    // Atualizando a tela

    pesquisarProdutos();
    atualizarEstatisticas();

    // Limpando formulário

    formulario.reset();

    mensagem.textContent = "Produto cadastrado com sucesso!";
    mensagem.className = "sucesso";

});


// ==========================================
// R5 - ALTERAR DISPONIBILIDADE
// ==========================================

document.getElementById("listaProdutos").addEventListener("click", function(event) {

    if (event.target.classList.contains("botao-status")) {

        const idProduto = Number(event.target.dataset.id);

        for (let i = 0; i < catalogo.itens.length; i++) {

            const produto = catalogo.itens[i];

            if (produto.id === idProduto) {

                produto.disponivel = !produto.disponivel;

                break;
            }
        }

        pesquisarProdutos();

        atualizarEstatisticas();
    }

});


// ==========================================
// R6 - ESTATÍSTICAS DO CARDÁPIO
// ==========================================

function atualizarEstatisticas() {

    let total = catalogo.itens.length;

    let quantidadeDisponiveis = 0;

    let somaPrecos = 0;

    let maiorPreco = 0;

    let produtoMaisCaro = "";

    for (let i = 0; i < catalogo.itens.length; i++) {

        const produto = catalogo.itens[i];

        // Contar produtos disponíveis

        if (produto.disponivel === true) {
            quantidadeDisponiveis++;
        }

        // Somar os preços

        somaPrecos += produto.preco;

        // Encontrar o produto mais caro

        if (produto.preco > maiorPreco) {

            maiorPreco = produto.preco;

            produtoMaisCaro = produto.nome;
        }
    }

    // Calcular preço médio

    let precoMedio = 0;

    if (total > 0) {
        precoMedio = somaPrecos / total;
    }

    // Atualizar informações na página

    document.getElementById("total").textContent =
        "Total de produtos: " + total;

    document.getElementById("disponiveis").textContent =
        "Disponíveis: " + quantidadeDisponiveis;

    document.getElementById("media").textContent =
        "Preço médio: " + precoMedio.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    document.getElementById("maiorPreco").textContent =
        "Produto mais caro: " + produtoMaisCaro +
        " (" + maiorPreco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        }) + ")";
}


// ==========================================
// INICIALIZAÇÃO DO SISTEMA
// ==========================================

renderizarProdutos(catalogo.itens);

atualizarEstatisticas();
