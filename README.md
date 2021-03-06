<h1 align="center"><img src="./.github/logo.png" width="100px"/></h1>

<h3 align="center">Foodfy - Receitas</h3>

<p align="center">“O que sabemos é uma gota. O que ignoramos é um oceano.”</p>

<p align="center">
  <a href="#about">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#install">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#challenge">Desafios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Tecnologias</a>
</p>

## :speech_balloon: Sobre <a name="about"></a>
> Em Foodfy podemos gerenciar receitas e chefs de cozinha.

<div align="center">
</div>

## :warning: Instalação <a name="install"></a>
> Esse projeto usou como SGBD o postgreSQL. Para o funcionamento é preciso realizar algumas configurações:


- Criar o banco de dados:
```sh
CREATE DATABASE foodfy;
```

- Rodar as querys disponíveis em:
```sh
src/config/foodfy.sql
```

- Configurar os dados do SGBD em:
```sh
src/config/db.js
```

- Instalar as dependências e iniciar o projeto:
```sh
npm install # instala as dependências...
npm start # roda o projeto...
```

## :triangular_flag_on_post: Desafio <a name="challenge"></a>
> Aprender conceitos de programação, entre eles: rotas, banco de dados e lógica de paginação...

*A realizar:*
- Organização
- Remomear variáveis
- Show chefs users page
- Limpar repetição de código

## :heavy_check_mark: Tecnologias <a name="technologies"></a>

- Multer
- Express
- Nunjucks
- PostgreSQL

---

by [Douglas Scaini](https://www.github.com/douglasscaini)