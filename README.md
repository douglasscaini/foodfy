<h1 align="center"><img src="./.github/chef.png" width=100px"/></h1>

<h3 align="center">Foodfy</h3>

<p align="center">“O que sabemos é uma gota. O que ignoramos é um oceano.”</p>

<p align="center">
  <a href="#about">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#install">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#challenge">Desafios</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Tecnologias</a>
</p>

## :speech_balloon: Sobre <a name="about"></a>

> **Necessidade de Negócio:**
>
> O Sr. Douglas, jovem aspirante a chefe de cozinha deseja, através da criação de uma aplicação web, gerenciar de forma prática as receitas que elabora.
>
> Em sua pequena carreira, pode notar que muito do conhecimento que havia adquirido, bem como, receitas que havia elaborado, tinham se perdido por não ter uma forma segura de armazenar esse conhecimento.
>
> Após conversação com um jovem programador, ambos decidiram desenvolver um projeto voltado para o modelo Business to Consumer, envolvendo a construção de parcerias entre chefes de cozinha, de forma a conseguirem armazenar e compartilhar receitas e segredos culinários com mais eficiência.
>
> **Justificativa do Projeto:**
>
> Para esse modelo de negócio, o Sr. Brandalise pretende conseguir formar uma comunidade de colaboradores que sejam dedicados e amantes da arte da culinária, afim de conseguir sempre atingir o próximo nível.
>
> Os alimentos trazem consigo memórias de bons momentos, reuniões familiares e suas tradições. O não registro e manutenção do conhecimento em torno desse costume podem acarretar percas e com isso, gerações futuras nunca terão acesso a uma parte importante da sua origem.
>
> **Premissa:**
>
> As receitas ficam ociosas quando escrita no caderninho de receitas. Com a aplicação web proposta, a agilidade e flexibilidade será muito melhor e beneficiará os chefs de cozinha no compartilhamento das mesmas.
>
> Utilizar-se de meios tecnológicos de forma eficiente é uma boa alternativa de amparo à preservação e compartilhamento das receitas culinárias, as quais são documentos culturais importantes, já que as mesmas, trazem consigo informações importantes de toda uma linhagem.
>
> Pratos criados por chefes de cozinha sempre vêm carregados de uma forte carga cultural do seu criador. Conseguir compartilhar as receitas de forma que seja possível manter os créditos e conhecimento de quem a idealizou é uma ótima forma de se conhecer toda a cultura envolvida na criação daquele prato.

<br />
<table>
  <tr>
    <td colspan="1">Visualização</td>
  </tr>
  <tr>
    <td><img src="#" width=1000px /></td></td>
  </tr>
</table>

## :warning: Instalação <a name="install"></a>

```bash
# Criar o banco de dados:
$ CREATE DATABASE foodfy;

# Rodar as querys disponíveis no diretório raiz:
$ foodfy.sql

# Configurar o banco de dados em:
$ src/config/db.js

# Configurar o nodemailer em:
$ src/lib/mailer.js

# Instalar todas as dependências necessárias:
$ npm install

# Iniciar o projeto em localhost:
$ npm start

# Acesse a rota do cliente:
$ http://localhost:3000
```

## :triangular_flag_on_post: Desafio <a name="challenge"></a>

> Aprender os principais conceitos para desenvolvimento de uma aplicação completa.

## :heavy_check_mark: Tecnologias <a name="technologies"></a>

- [Node](https://nodejs.org/en/)
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [PostgreSQL](https://www.postgresql.org/)

---

by [Douglas Scaini](https://www.github.com/douglasscaini) ❤️
