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
> Esse projeto usa o SGBD postgreSQL. Segue as querys para funcionamento:

```sh
CREATE DATABASE foodfy;

CREATE TABLE recipes(
  id serial primary key,
  chef_id int not null,
  image text not null,
  title text not null,
  ingredients text[] not null,
  preparation text[] not null,
  information text not null,
  created_at date not null);

  CREATE TABLE chefs(
  id serial primary key,
  name text not null,
  avatar_url text not null,
  created_at date not null);

Configurar os dados de seu SGBD em 'src/config/db.js'
Algumas querys de dados se encontram em 'src/config/data.sql'
```

> Depois de configurar o SGDB, instalar as dependências do projeto:

```sh
npm install # instala as dependências...
npm start # roda o projeto...
```

## :triangular_flag_on_post: Desafio <a name="challenge"></a>
> Aprender diversos conceitos de programação, entre eles: rotas, banco de dados e lógica de paginação...

## :heavy_check_mark: Tecnologias <a name="technologies"></a>

- PostgreSQL
- Nunjucks
- Express

---

by [Douglas Scaini](https://www.github.com/douglasscaini)