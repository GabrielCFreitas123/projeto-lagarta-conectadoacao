// Cada categoria reúne seu título, orientação e pares de ícone/nome.
const categorias = {
    roupas: {
        titulo: 'Tipos de roupas para doar',
        dica: 'Separe peças limpas e em bom estado. Confirme com o local quais itens ele recebe.',
        itens: [['👕', 'Camisetas'], ['👖', 'Calças'], ['🧥', 'Agasalhos'], ['👗', 'Vestidos'], ['🩳', 'Bermudas'], ['👶', 'Roupas de bebê'], ['👟', 'Calçados'], ['🧣', 'Cachecóis']]
    },
    alimentos: {
        titulo: 'Tipos de alimentos para doar',
        dica: 'Escolha alimentos não perecíveis, com embalagem fechada e dentro da validade.',
        itens: [['🍚', 'Arroz'], ['🫘', 'Feijão'], ['🍝', 'Macarrão'], ['🥫', 'Enlatados'], ['🛢️', 'Óleo de cozinha'], ['🥛', 'Leite em pó']]
    },
    livros: {
        titulo: 'Tipos de livros para doar',
        dica: 'Confira se os livros estão completos, limpos e em condições de leitura.',
        itens: [['📘', 'Didáticos'], ['📖', 'Literatura'], ['🧒', 'Infantis'], ['💬', 'Quadrinhos']]
    },
    brinquedos: {
        titulo: 'Tipos de brinquedos para doar',
        dica: 'Doe brinquedos limpos, completos e seguros para a faixa etária indicada.',
        itens: [['🧸', 'Pelúcias'], ['🪆', 'Bonecas'], ['🚗', 'Carrinhos'], ['🧩', 'Quebra-cabeças'], ['🎲', 'Jogos de tabuleiro'], ['⚽', 'Bolas']]
    }
};

const seletor = document.querySelector('.escolha-doacao');
const botoes = seletor.querySelectorAll('[data-categoria]');
const lista = document.querySelector('#lista-tipos');
const itensCesta = document.querySelector('#itens-cesta');
const cestaVazia = document.querySelector('#cesta-vazia');
const resumoCesta = document.querySelector('.cesta-resumo');
const totalCesta = document.querySelector('#total-cesta');
const limparCesta = document.querySelector('#limpar-cesta');
const verLocais = document.querySelector('#ver-locais');
const cesta = new Map();
const chaveArmazenamento = 'conectadoacao-cesta-v1';

function salvarCesta() {
    try {
        localStorage.setItem(chaveArmazenamento, JSON.stringify([...cesta.values()]));
    } catch {
        // A cesta continua funcionando nesta página se o armazenamento não estiver disponível.
    }
}

function recuperarCesta() {
    try {
        const salvos = JSON.parse(localStorage.getItem(chaveArmazenamento) || '[]');
        if (!Array.isArray(salvos)) return;

        salvos.forEach(({ categoria, nome, quantidade }) => {
            const itemValido = categorias[categoria]?.itens.some(([, item]) => item === nome);
            if (itemValido && Number.isSafeInteger(quantidade) && quantidade > 0) {
                cesta.set(`${categoria}:${nome}`, { categoria, nome, quantidade });
            }
        });
    } catch {
        // Dados antigos ou inválidos não impedem o uso da página.
    }
}

function mostrarCesta() {
    const itens = [...cesta.entries()].map(([chave, { categoria, nome, quantidade }]) => {
        const item = document.createElement('li');
        const descricao = document.createElement('span');
        descricao.textContent = `${nome} (${categoria}) — ${quantidade} ${quantidade === 1 ? 'unidade' : 'unidades'}`;

        const remover = document.createElement('button');
        remover.type = 'button';
        remover.textContent = 'Remover';
        remover.setAttribute('aria-label', `Remover ${nome} da cesta`);
        remover.addEventListener('click', () => {
            cesta.delete(chave);
            mostrarCesta();
        });

        item.append(descricao, remover);
        return item;
    });

    itensCesta.replaceChildren(...itens);
    cestaVazia.hidden = cesta.size > 0;
    resumoCesta.hidden = cesta.size === 0;
    const total = [...cesta.values()].reduce((soma, item) => soma + item.quantidade, 0);
    totalCesta.textContent = `${total} ${total === 1 ? 'item escolhido' : 'itens escolhidos'}`;
    const categoriasEscolhidas = [...new Set([...cesta.values()].map((item) => item.categoria))];
    const parametros = new URLSearchParams();
    if (categoriasEscolhidas.length) parametros.set('categorias', categoriasEscolhidas.join(','));
    verLocais.href = `locais.html${parametros.size ? `?${parametros}` : ''}`;
    salvarCesta();
}

function mostrarCategoria(nome) {
    const categoria = categorias[nome];
    document.querySelector('#titulo-tipos').textContent = categoria.titulo;
    document.querySelector('#dica-doacao').textContent = categoria.dica;

    const itens = categoria.itens.map(([icone, nomeItem], indice) => {
        const item = document.createElement('li');
        const simbolo = document.createElement('span');
        simbolo.setAttribute('aria-hidden', 'true');
        simbolo.textContent = icone;

        const nomeExibido = document.createElement('strong');
        nomeExibido.textContent = nomeItem;

        const quantidade = document.createElement('input');
        quantidade.type = 'number';
        quantidade.min = '1';
        quantidade.max = '999';
        quantidade.required = true;
        quantidade.value = '1';
        quantidade.id = `quantidade-${nome}-${indice}`;
        quantidade.setAttribute('aria-label', `Quantidade de ${nomeItem}`);

        const adicionar = document.createElement('button');
        adicionar.type = 'button';
        adicionar.textContent = 'Adicionar à cesta';
        adicionar.addEventListener('click', () => {
            if (!quantidade.reportValidity() || !Number.isInteger(quantidade.valueAsNumber)) return;

            const chave = `${nome}:${nomeItem}`;
            const anterior = cesta.get(chave)?.quantidade || 0;
            cesta.set(chave, {
                categoria: nome,
                nome: nomeItem,
                quantidade: anterior + quantidade.valueAsNumber
            });
            mostrarCesta();
        });

        item.append(simbolo, nomeExibido, quantidade, adicionar);
        return item;
    });

    // Substitui a lista anterior para não acumular itens ao trocar a categoria.
    lista.replaceChildren(...itens);
    botoes.forEach((botao) => {
        botao.setAttribute('aria-pressed', String(botao.dataset.categoria === nome));
    });
}

botoes.forEach((botao) => {
    botao.addEventListener('click', () => mostrarCategoria(botao.dataset.categoria));
});

limparCesta.addEventListener('click', () => {
    cesta.clear();
    mostrarCesta();
});

recuperarCesta();
const categoriaInicial = new URLSearchParams(window.location.search).get('categoria');
mostrarCategoria(categorias[categoriaInicial] ? categoriaInicial : 'roupas');
mostrarCesta();
seletor.hidden = false;
