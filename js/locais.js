const filtros = document.querySelector('.filtros-locais');
const busca = document.querySelector('#busca-local');
const categoria = document.querySelector('#categoria-local');
const regiao = document.querySelector('#regiao-local');
const resultado = document.querySelector('#resultado-locais');
const resumo = document.querySelector('#resumo-doacao');
const resumoItens = document.querySelector('#resumo-itens');
const locais = [...document.querySelectorAll('.local-card')];
const categoriasValidas = new Set(['roupas', 'alimentos', 'livros', 'brinquedos']);
const categoriasCesta = new Set(
    (new URLSearchParams(window.location.search).get('categorias') || '')
        .split(',')
        .filter((nome) => categoriasValidas.has(nome))
);

if (categoriasCesta.size) {
    const opcaoCesta = document.createElement('option');
    opcaoCesta.value = 'cesta';
    opcaoCesta.textContent = 'Tipos da minha cesta';
    categoria.add(opcaoCesta, 1);
    categoria.value = 'cesta';
}

try {
    const itensSalvos = JSON.parse(localStorage.getItem('conectadoacao-cesta-v1') || '[]');
    if (Array.isArray(itensSalvos)) {
        itensSalvos.forEach((item) => {
            if (!item || !categoriasValidas.has(item.categoria)
                || (categoriasCesta.size && !categoriasCesta.has(item.categoria))
                || typeof item.nome !== 'string' || !Number.isSafeInteger(item.quantidade)
                || item.quantidade < 1) return;

            const linha = document.createElement('li');
            linha.textContent = `${item.nome} (${item.categoria}) — ${item.quantidade} ${item.quantidade === 1 ? 'unidade' : 'unidades'}`;
            resumoItens.append(linha);
        });
        resumo.hidden = resumoItens.children.length === 0;
    }
} catch {
    // A lista de locais continua disponível se o navegador bloquear o armazenamento.
}

function normalizar(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filtrarLocais() {
    const termo = normalizar(busca.value.trim());
    const tipo = categoria.value;
    const bairro = regiao.value;
    let encontrados = 0;

    locais.forEach((local) => {
        const categoriasLocal = local.dataset.categorias.split(' ');
        const correspondeCategoria = !tipo || (tipo === 'cesta'
            ? categoriasLocal.some((nome) => categoriasCesta.has(nome))
            : categoriasLocal.includes(tipo));
        const corresponde = correspondeCategoria
            && (!bairro || local.dataset.regiao === bairro)
            && normalizar(local.textContent).includes(termo);
        local.hidden = !corresponde;
        if (corresponde) encontrados += 1;
    });

    const prefixo = tipo === 'cesta' ? 'Para os tipos da sua cesta: ' : '';
    resultado.textContent = encontrados === 0
        ? 'Nenhum local encontrado. Tente outra busca ou ajuste os filtros.'
        : `${prefixo}${encontrados} ${encontrados === 1 ? 'local encontrado' : 'locais encontrados'}.`;
}

busca.addEventListener('input', filtrarLocais);
categoria.addEventListener('change', filtrarLocais);
regiao.addEventListener('change', filtrarLocais);
filtros.hidden = false;
resultado.hidden = false;
filtrarLocais();
