// Categorias e itens disponíveis para doação.
const categorias = {
    roupas: {
        titulo: 'Tipos de roupas para doar',
        dica: 'Separe peças limpas e em bom estado.',
        itens: [['👕', 'Camisetas'], ['👖', 'Calças'], ['🧥', 'Agasalhos'], ['👗', 'Vestidos'], ['🩳', 'Bermudas'], ['👶', 'Roupas de bebê'], ['👟', 'Calçados'], ['🧣', 'Cachecóis']]
    },
    alimentos: {
        titulo: 'Tipos de alimentos para doar',
        dica: 'Escolha alimentos fechados e dentro da validade.',
        itens: [['🍚', 'Arroz'], ['🫘', 'Feijão'], ['🍝', 'Macarrão'], ['🥫', 'Enlatados'], ['🛢️', 'Óleo de cozinha'], ['🥛', 'Leite em pó']]
    },
    livros: {
        titulo: 'Tipos de livros para doar',
        dica: 'Confira se os livros estão completos e limpos.',
        itens: [['📘', 'Didáticos'], ['📖', 'Literatura'], ['🧒', 'Infantis'], ['💬', 'Quadrinhos']]
    },
    brinquedos: {
        titulo: 'Tipos de brinquedos para doar',
        dica: 'Doe brinquedos limpos, completos e seguros.',
        itens: [['🧸', 'Pelúcias'], ['🪆', 'Bonecas'], ['🚗', 'Carrinhos'], ['🧩', 'Quebra-cabeças'], ['🎲', 'Jogos de tabuleiro'], ['⚽', 'Bolas']]
    }
};

const secao = document.querySelector('.escolha-doacao');
const botoes = document.querySelectorAll('[data-categoria]');
const lista = document.querySelector('#lista-tipos');
const listaCesta = document.querySelector('#itens-cesta');
const cestaVazia = document.querySelector('#cesta-vazia');
const resumo = document.querySelector('.cesta-resumo');
const total = document.querySelector('#total-cesta');
const linkLocais = document.querySelector('#ver-locais');

let cesta = JSON.parse(localStorage.getItem('conectadoacao-cesta-v1')) || [];

function salvarCesta() {
    localStorage.setItem('conectadoacao-cesta-v1', JSON.stringify(cesta));
}

function mostrarCesta() {
    listaCesta.innerHTML = '';
    let quantidadeTotal = 0;
    const categoriasEscolhidas = [];

    cesta.forEach(function (produto, indice) {
        quantidadeTotal += produto.quantidade;

        if (!categoriasEscolhidas.includes(produto.categoria)) {
            categoriasEscolhidas.push(produto.categoria);
        }

        const item = document.createElement('li');
        const informacoes = document.createElement('div');
        const nome = document.createElement('span');
        const detalhes = document.createElement('span');
        const remover = document.createElement('button');

        informacoes.className = 'cesta-item-info';
        nome.className = 'cesta-item-nome';
        detalhes.className = 'cesta-item-detalhes';
        remover.className = 'cesta-remover';
        remover.type = 'button';

        nome.textContent = produto.nome;
        detalhes.textContent = produto.categoria + ' · ' + produto.quantidade + ' unidade(s)';
        remover.textContent = 'Remover';

        remover.addEventListener('click', function () {
            cesta.splice(indice, 1);
            mostrarCesta();
        });

        informacoes.append(nome, detalhes);
        item.append(informacoes, remover);
        listaCesta.append(item);
    });

    cestaVazia.hidden = cesta.length > 0;
    resumo.hidden = cesta.length === 0;
    total.textContent = quantidadeTotal + ' item(ns) escolhido(s)';

    if (categoriasEscolhidas.length > 0) {
        linkLocais.href = 'locais.html?categorias=' + categoriasEscolhidas.join(',');
    } else {
        linkLocais.href = 'locais.html';
    }

    salvarCesta();
}

function adicionarNaCesta(categoria, nome, quantidade) {
    const produto = cesta.find(function (item) {
        return item.categoria === categoria && item.nome === nome;
    });

    if (produto) {
        produto.quantidade += quantidade;
    } else {
        cesta.push({ categoria: categoria, nome: nome, quantidade: quantidade });
    }

    mostrarCesta();
}

function mostrarCategoria(nomeCategoria) {
    const categoria = categorias[nomeCategoria];
    document.querySelector('#titulo-tipos').textContent = categoria.titulo;
    document.querySelector('#dica-doacao').textContent = categoria.dica;
    lista.innerHTML = '';

    categoria.itens.forEach(function (dadosItem) {
        const item = document.createElement('li');
        const icone = document.createElement('span');
        const nome = document.createElement('strong');
        const quantidade = document.createElement('input');
        const adicionar = document.createElement('button');

        icone.textContent = dadosItem[0];
        nome.textContent = dadosItem[1];
        quantidade.type = 'number';
        quantidade.min = '1';
        quantidade.value = '1';
        quantidade.setAttribute('aria-label', 'Quantidade de ' + dadosItem[1]);
        adicionar.type = 'button';
        adicionar.textContent = 'Adicionar à cesta';

        adicionar.addEventListener('click', function () {
            const valor = Number(quantidade.value);
            if (valor > 0) {
                adicionarNaCesta(nomeCategoria, dadosItem[1], valor);
            }
        });

        item.append(icone, nome, quantidade, adicionar);
        lista.append(item);
    });

    botoes.forEach(function (botao) {
        const selecionado = botao.dataset.categoria === nomeCategoria;
        botao.setAttribute('aria-pressed', selecionado);
    });
}

botoes.forEach(function (botao) {
    botao.addEventListener('click', function () {
        mostrarCategoria(botao.dataset.categoria);
    });
});

document.querySelector('#limpar-cesta').addEventListener('click', function () {
    cesta = [];
    mostrarCesta();
});

const categoriaDaUrl = new URLSearchParams(window.location.search).get('categoria');
mostrarCategoria(categorias[categoriaDaUrl] ? categoriaDaUrl : 'roupas');
mostrarCesta();
secao.hidden = false;
