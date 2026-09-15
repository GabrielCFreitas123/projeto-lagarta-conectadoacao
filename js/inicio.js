const orientacoes = {
    roupas: ['Roupas', 'Separe peças limpas e em bom estado.'],
    alimentos: ['Alimentos', 'Confira se as embalagens estão fechadas e dentro da validade.'],
    livros: ['Livros', 'Escolha livros completos e em condições de leitura.'],
    brinquedos: ['Brinquedos', 'Separe brinquedos limpos, completos e seguros.']
};

const secaoInicio = document.querySelector('#escolha-inicio');
const botoesInicio = [...secaoInicio.querySelectorAll('[data-categoria]')];
const tituloInicio = document.querySelector('#categoria-escolhida');
const dicaInicio = document.querySelector('#dica-inicio');
const continuarDoacao = document.querySelector('#continuar-doacao');

function escolherCategoria(nome) {
    const [titulo, dica] = orientacoes[nome];
    tituloInicio.textContent = titulo;
    dicaInicio.textContent = dica;
    continuarDoacao.href = `quero-doar.html?categoria=${encodeURIComponent(nome)}`;
    botoesInicio.forEach((botao) => {
        botao.setAttribute('aria-pressed', String(botao.dataset.categoria === nome));
    });
}

botoesInicio.forEach((botao) => {
    botao.addEventListener('click', () => escolherCategoria(botao.dataset.categoria));
});

escolherCategoria('roupas');
secaoInicio.hidden = false;
