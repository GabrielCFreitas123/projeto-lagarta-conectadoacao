// Textos mostrados quando o usuário escolhe uma categoria.
const orientacoes = {
    roupas: ['Roupas', 'Separe peças limpas e em bom estado.'],
    alimentos: ['Alimentos', 'Confira se as embalagens estão fechadas e dentro da validade.'],
    livros: ['Livros', 'Escolha livros completos e em condições de leitura.'],
    brinquedos: ['Brinquedos', 'Separe brinquedos limpos, completos e seguros.']
};

const secao = document.querySelector('#escolha-inicio');
const botoes = document.querySelectorAll('[data-categoria]');
const titulo = document.querySelector('#categoria-escolhida');
const dica = document.querySelector('#dica-inicio');
const link = document.querySelector('#continuar-doacao');

function escolherCategoria(categoria) {
    titulo.textContent = orientacoes[categoria][0];
    dica.textContent = orientacoes[categoria][1];
    link.href = 'quero-doar.html?categoria=' + categoria;

    botoes.forEach(function (botao) {
        const selecionado = botao.dataset.categoria === categoria;
        botao.setAttribute('aria-pressed', selecionado);
    });
}

botoes.forEach(function (botao) {
    botao.addEventListener('click', function () {
        escolherCategoria(botao.dataset.categoria);
    });
});

escolherCategoria('roupas');
secao.hidden = false;
