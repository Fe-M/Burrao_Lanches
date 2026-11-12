//[R1] Dados: array de objetos e objeto principal

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

    adicionar: function (item) {
        this.itens.push(item);
    },

    contar: function () {
        return this.itens.length;
    }
};

//[R2] Renderização dinâmica

function renderizar(lista) {

    const container = document.getElementById("listaProdutos");

    container.innerHTML = "";

    if (lista.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum item encontrado";
        container.appendChild(mensagem);
        return;
    }

    for (let i = 0; i < lista.length; i++) {

        const produto = lista[i];

        const card = document.createElement("div");
        card.classList.add("card-produto");

        switch (produto.categoria) {
            case "Lanches":
                card.classList.add("cat-lanches");
                break;
            case "Bebidas":
                card.classList.add("cat-bebidas");
                break;
            case "Sobremesas":
                card.classList.add("cat-sobremesas");
                break;
            default:
                card.classList.add("cat-padrao");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = produto.nome;

        const categoria = document.createElement("p");
        categoria.textContent = "Categoria: " + produto.categoria;

        let textoDescricao = produto.descricao;
        if (textoDescricao.length > 60) {
            textoDescricao = textoDescricao.slice(0, 60) + "…";
        }
        const descricao = document.createElement("p");
        descricao.textContent = textoDescricao;

        const preco = document.createElement("p");
        preco.textContent = "Preço: R$ " + produto.preco.toFixed(2);

        // [R5] Interação nos cards
        const status = document.createElement("p");
        status.textContent = produto.disponivel ? "Disponível" : "Indisponível";

        const botao = document.createElement("button");
        botao.classList.add("botao-status");
        botao.textContent = produto.disponivel
            ? "Marcar como indisponível"
            : "Marcar como disponível";

        card.classList.toggle("card-indisponivel", !produto.disponivel);

        botao.addEventListener("click", function () {

            produto.disponivel = !produto.disponivel;

            card.classList.toggle("card-indisponivel");

            status.textContent = produto.disponivel ? "Disponível" : "Indisponível";

            botao.textContent = produto.disponivel
                ? "Marcar como indisponível"
                : "Marcar como disponível";

            atualizarPainel(lista);
        });
        card.appendChild(titulo);
        card.appendChild(categoria);
        card.appendChild(descricao);
        card.appendChild(preco);
        card.appendChild(status);
        card.appendChild(botao);

        container.appendChild(card);
    }
}

// [R3] Busca e filtro

function filtrarProdutos() {

    const textoBusca = document.getElementById("busca").value.toLowerCase();
    const categoriaSelecionada = document.getElementById("categoria").value;

    const encontrados = [];

    for (let i = 0; i < catalogo.itens.length; i++) {

        const produto = catalogo.itens[i];

        const correspondeNome = produto.nome.toLowerCase().indexOf(textoBusca) !== -1;

        const correspondeCategoria =
            categoriaSelecionada === "Todas" ||
            produto.categoria === categoriaSelecionada;

        if (correspondeNome && correspondeCategoria) {
            encontrados.push(produto);
        }
    }

    return encontrados;
}

function pesquisarProdutos() {
    const encontrados = filtrarProdutos();
    renderizar(encontrados);
    atualizarPainel(encontrados);
}

document.getElementById("busca").addEventListener("input", pesquisarProdutos);

document.getElementById("categoria").addEventListener("change", pesquisarProdutos);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.getElementById("busca").value = "";
        document.getElementById("categoria").value = "Todas";
        pesquisarProdutos();
    }
});

// [R4] Formulário de cadastro com validação

const formulario = document.getElementById("formProduto");

function marcarErro(idCampo) {
    document.getElementById(idCampo).classList.add("campo-erro");
}

function limparErros() {
    const ids = ["nome", "preco", "categoriaNova"];

    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).classList.remove("campo-erro");
    }
}

function validar(dados) {

    if (dados.nome.length < 3) {
        marcarErro("nome");
        throw new Error("O nome deve ter no mínimo 3 caracteres.");
    }

    if (isNaN(dados.preco) || dados.preco <= 0 || dados.preco > 1000) {
        marcarErro("preco");
        throw new Error("Digite um preço maior que 0 e até 1000.");
    }

    if (dados.categoria === "") {
        marcarErro("categoriaNova");
        throw new Error("Selecione uma categoria.");
    }
}

function gerarNovoId() {
    let novoId = 1;

    for (let i = 0; i < catalogo.itens.length; i++) {
        if (catalogo.itens[i].id >= novoId) {
            novoId = catalogo.itens[i].id + 1;
        }
    }

    return novoId;
}

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    const mensagem = document.getElementById("mensagem");

    limparErros();

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        preco: Number(document.getElementById("preco").value.trim().replace(",", ".")),
        categoria: document.getElementById("categoriaNova").value,
        descricao: document.getElementById("descricao").value.trim()
    };

    try {
        validar(dados);

        catalogo.adicionar({
            id: gerarNovoId(),
            nome: dados.nome,
            categoria: dados.categoria,
            descricao: dados.descricao,
            preco: dados.preco,
            disponivel: true
        });

        formulario.reset();

        mensagem.textContent = "Produto cadastrado com sucesso!";
        mensagem.className = "sucesso";

        pesquisarProdutos();

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.className = "erro";
    }
});


// [R6] Painel de estatísticas

function atualizarPainel(lista) {

    const total = lista.length;

    let quantidadeDisponiveis = 0;
    let somaPrecos = 0;
    let produtoMaisCaro = null;

    for (let i = 0; i < lista.length; i++) {

        const produto = lista[i];

        if (produto.disponivel === true) {
            quantidadeDisponiveis++;
        }

        somaPrecos += produto.preco;

        if (produtoMaisCaro === null || produto.preco > produtoMaisCaro.preco) {
            produtoMaisCaro = produto;
        }
    }

    let textoMedia = "—";
    let textoMaisCaro = "—";

    if (total > 0) {
        const media = somaPrecos / total;

        textoMedia = "R$ " + media.toFixed(2).replace(".", ",");

        textoMaisCaro = produtoMaisCaro.nome +
            " (R$ " + produtoMaisCaro.preco.toFixed(2).replace(".", ",") + ")";
    }

    document.getElementById("total").textContent =
        "Total de produtos: " + total;

    document.getElementById("disponiveis").textContent =
        "Disponíveis: " + quantidadeDisponiveis;

    document.getElementById("media").textContent =
        "Preço médio: " + textoMedia;

    document.getElementById("maiorPreco").textContent =
        "Produto mais caro: " + textoMaisCaro;
}

// [R7] Inicialização da página
pesquisarProdutos();