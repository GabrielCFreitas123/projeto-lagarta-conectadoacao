const formulario = document.querySelector('#form-login');
const mensagem = document.querySelector('#mensagem-login');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const email = document.querySelector('#email').value;

    // Guarda o e-mail apenas para esta demonstração front-end.
    localStorage.setItem('conectadoacao-usuario', email);

    mensagem.textContent = 'Login realizado com sucesso!';
    mensagem.className = 'mensagem-login sucesso';
    formulario.reset();
});
