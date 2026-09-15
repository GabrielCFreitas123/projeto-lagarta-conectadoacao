# ConectaDoação — Projeto Lagarta

Projeto extensionista desenvolvido com **HTML5, CSS3 e JavaScript**.

## 1. Ideação

O processo de ideação começou a partir de uma pergunta simples: como utilizar conhecimentos de desenvolvimento web para resolver ou reduzir um problema real da comunidade?

Uma dificuldade comum é encontrar informações organizadas sobre onde realizar doações. Muitas pessoas possuem roupas, alimentos, livros ou brinquedos em boas condições, mas não sabem quais instituições recebem esses itens ou quais cuidados devem ser tomados antes da entrega.

A partir disso surgiu o **ConectaDoação**, uma aplicação web que tem como objetivo aproximar pessoas interessadas em doar de pontos de recebimento e iniciativas sociais.

A proposta do projeto é criar uma experiência simples e acessível para orientar o usuário e incentivar ações solidárias.

## 2. Protótipo inicial

Antes da implementação, recomenda-se criar um protótipo da interface em papel, Figma, Canva ou outra ferramenta.

Adicione nesta seção as imagens reais do protótipo utilizado pelo grupo.

Exemplo:

```md
![Protótipo da página inicial](img/prototipo-home.png)
![Protótipo da seção de doações](img/prototipo-doacoes.png)
```

> Importante: substitua esta orientação pelas imagens do protótipo produzido pelo grupo antes da entrega final.

## 3. Caráter extensionista

O projeto apresenta caráter extensionista porque procura aplicar conhecimentos acadêmicos em uma solução que pode ser utilizada pela comunidade.

O ConectaDoação facilita o acesso a informações relacionadas à doação de roupas, alimentos, livros e brinquedos. Além disso, incentiva a participação social ao apresentar orientações simples para quem deseja contribuir.

A publicação do código no GitHub permite que outras pessoas tenham acesso à solução, estudem seu funcionamento e possam adaptá-la para outras comunidades.

A página de locais reúne quatro opções reais em São Paulo (SP), com links para as páginas oficiais consultadas em setembro de 2026. Como regras de recebimento e horários podem mudar, o doador deve confirmar os detalhes diretamente com cada instituição antes da entrega.

## 4. Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Git
- GitHub

## 5. Estrutura do projeto

```text
projeto-lagarta-conectadoacao/
│
├── index.html
├── como-funciona.html
├── locais.html
├── quero-doar.html
├── sobre.html
├── README.md
├── css/
│   └── style.css
├── js/
│   ├── inicio.js
│   ├── doacoes.js
│   └── locais.js
└── img/
```

## 6. HTML5

O arquivo `index.html` é responsável pela estrutura da aplicação.

O início do documento utiliza:

```html
<!DOCTYPE html>
<html lang="pt-BR">
```

`<!DOCTYPE html>` informa ao navegador que o documento utiliza HTML5.

O atributo `lang="pt-BR"` indica que o conteúdo da página está em português brasileiro.

No elemento `<head>` foram adicionadas configurações importantes:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

`charset="UTF-8"` permite a exibição correta de acentos e caracteres especiais.

A configuração `viewport` ajuda a página a se adaptar a celulares, tablets e computadores.

### Estrutura semântica

Foram utilizados elementos semânticos do HTML5, como:

- `<header>` para o cabeçalho;
- `<nav>` para o menu;
- `<main>` para o conteúdo principal;
- `<section>` para dividir as áreas do site;
- `<article>` para os cartões de conteúdo;
- `<form>` para o formulário;
- `<footer>` para o rodapé.

Essa organização melhora a leitura do código e a estrutura da página.

## 7. CSS3

O arquivo `css/style.css` controla a aparência do site.

Foram utilizadas variáveis CSS para facilitar a manutenção das cores:

```css
:root {
    --verde: #1f7a4d;
    --verde-escuro: #145436;
    --verde-claro: #e8f5ee;
}
```

Assim, as mesmas cores podem ser reutilizadas em diversos componentes.

Também foi utilizado CSS Grid:

```css
.grade-locais {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
```

Esse código cria três colunas para os cartões de locais de doação.

### Responsividade

O projeto possui Media Queries para adaptar o layout em telas menores.

Exemplo:

```css
@media (max-width: 620px) {
    .grade-locais {
        grid-template-columns: 1fr;
    }
}
```

Quando a tela possui até 620 pixels, os cartões passam a ocupar uma coluna.

## 8. Como executar o projeto

Na página **Início**, o JavaScript mostra orientações rápidas por categoria e abre **Quero doar** com a categoria escolhida. Em **Quero doar**, permite adicionar itens e quantidades a uma cesta. As escolhas são salvas no navegador e permanecem ao atualizar a página. A cesta mostra o total, permite remover itens ou esvaziá-la. Ao seguir para **Locais**, as categorias escolhidas são usadas para mostrar apenas pontos compatíveis, e os itens da cesta aparecem em um resumo. A página permite buscar por nome ou item e filtrar por categoria, bairro ou retirada agendada. Os cartões de locais continuam visíveis sem JavaScript.

1. Faça o download ou clone o repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Abra o arquivo `index.html` no navegador.

Também é possível utilizar a extensão **Live Server** no Visual Studio Code.

## 9. Como publicar no GitHub

Crie um repositório no GitHub e envie os arquivos do projeto.

Exemplo de comandos:

```bash
git init
git add .
git commit -m "Projeto Lagarta - ConectaDoacao"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

Troque `URL_DO_SEU_REPOSITORIO` pelo endereço do repositório criado no GitHub.

## 10. Melhorias futuras

Algumas possíveis melhorias são:

- ampliar e revisar periodicamente os locais cadastrados;
- adicionar busca por bairro ou cidade;
- utilizar mapa;
- adicionar contatos e links oficiais;
- permitir cadastro de novos pontos;
- armazenar informações utilizando banco de dados;
- criar uma versão com API e backend.

## 11. Conclusão

O desenvolvimento do ConectaDoação permitiu aplicar conceitos de HTML5 e CSS3 em uma proposta voltada para a comunidade.

Com o HTML5, foi possível estruturar semanticamente o conteúdo da página.

Com o CSS3, foram trabalhados layout, cores, espaçamento, responsividade e adaptação para diferentes tamanhos de tela.

O projeto também mostrou a importância de pensar a tecnologia não apenas como exercício acadêmico, mas como ferramenta capaz de apoiar necessidades da sociedade.

## 12. Integrantes

**Nome:** Gabriel Freitas  
**RA:** 10771415

**Nome:** [NOME DO INTEGRANTE]  
**RA:** [RA DO INTEGRANTE]

**Nome:** [NOME DO INTEGRANTE]  
**RA:** [RA DO INTEGRANTE]
