const busca = document.querySelector('#busca-local');
const categoria = document.querySelector('#categoria-local');
const regiao = document.querySelector('#regiao-local');
const resultado = document.querySelector('#resultado-locais');
const locais = document.querySelectorAll('.local-card');

const parametros = new URLSearchParams(window.location.search);
const categoriasCesta = (parametros.get('categorias') || '').split(',').filter(Boolean);
const itensCesta = JSON.parse(localStorage.getItem('conectadoacao-cesta-v1')) || [];

// Mostra os itens escolhidos na página anterior.
if (itensCesta.length > 0) {
    const resumo = document.querySelector('#resumo-doacao');
    const listaResumo = document.querySelector('#resumo-itens');

    itensCesta.forEach(function (item) {
        const linha = document.createElement('li');
        linha.textContent = item.nome + ' (' + item.categoria + ') — ' + item.quantidade + ' unidade(s)';
        listaResumo.append(linha);
    });

    resumo.hidden = false;
}

// Adiciona ao filtro a opção de usar as categorias da cesta.
if (categoriasCesta.length > 0) {
    const opcao = document.createElement('option');
    opcao.value = 'cesta';
    opcao.textContent = 'Tipos da minha cesta';
    categoria.add(opcao, 1);
    categoria.value = 'cesta';
}

function simplificarTexto(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filtrarLocais() {
    const textoBuscado = simplificarTexto(busca.value);
    const categoriaEscolhida = categoria.value;
    const regiaoEscolhida = regiao.value;
    let quantidade = 0;

    locais.forEach(function (local) {
        const categoriasLocal = local.dataset.categorias.split(' ');
        let aceitaCategoria = true;

        if (categoriaEscolhida === 'cesta') {
            aceitaCategoria = categoriasCesta.some(function (nome) {
                return categoriasLocal.includes(nome);
            });
        } else if (categoriaEscolhida) {
            aceitaCategoria = categoriasLocal.includes(categoriaEscolhida);
        }

        const aceitaRegiao = !regiaoEscolhida || local.dataset.regiao === regiaoEscolhida;
        const aceitaBusca = simplificarTexto(local.textContent).includes(textoBuscado);
        const mostrar = aceitaCategoria && aceitaRegiao && aceitaBusca;

        local.hidden = !mostrar;
        if (mostrar) quantidade++;
    });

    if (quantidade === 0) {
        resultado.textContent = 'Nenhum local encontrado.';
    } else {
        resultado.textContent = quantidade + ' local(is) encontrado(s).';
    }
}

busca.addEventListener('input', filtrarLocais);
categoria.addEventListener('change', filtrarLocais);
regiao.addEventListener('change', filtrarLocais);

document.querySelector('.filtros-locais').hidden = false;
resultado.hidden = false;
filtrarLocais();
