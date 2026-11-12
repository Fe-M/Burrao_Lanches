
const produtos = [
    {
        id: 1,
        nome: "X-Burger",
        categoria: "Lanches",
        descricao: "Pão, hambúrguer, queijo e molho especial.",
        preco: 18.00,
        disponivel: true
    },
    {
        id: 2,
        nome: "X-Salada",
        categoria: "Lanches",
        descricao: "Pão, hambúrguer, queijo, alface e tomate.",
        preco: 20.00,
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
        preco: 9.00,
        disponivel: true
    },
    {
        id: 6,
        nome: "Água Mineral",
        categoria: "Bebidas",
        descricao: "Água mineral sem gás de 500ml.",
        preco: 4.00,
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
    nome: "Sabor & Cia",
    itens: produtos,

    adicionar: function(item) {
        this.itens.push(item);
    },

    contar: function() {
        return this.itens.length;
    }
};
