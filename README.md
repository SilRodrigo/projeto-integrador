
  

#  📘 Programação para Internet – Univates

  

Este projeto contém um **monorepo** com:

  

-  **Backend**: Node.js + Express + Prisma

-  **Frontend**: React + Vite + Tailwind + Shadcn

  

---

  

##  ✅ Requisitos

  

Antes de rodar o projeto, é necessário ter instalado:

  

-  **[Node.js LTS (>=18.x)](https://nodejs.org/)**

-  **[PostgreSQL](https://www.postgresql.org/)**

  

Verifique as instalações com:

  

```bash

node -v

npm -v

psql --version

```

  

---

  

##  🚀 Como rodar do zero

  

###  1️⃣ Extrair o projeto

Baixe o arquivo `.zip`, extraia para uma pasta e abra no terminal:

  

```bash

cd programacao-para-internet-univates

```

  

###  2️⃣ Instalar dependências

Na raiz do projeto:

  

```bash

npm install

```

> Esse comando instala as dependências do **backend** e do **frontend** de uma vez.

  

Crie as tabelas no banco de dados:

  

```bash

npm run  prisma:db-push  --workspace  backend

```
Para criar os users, rode o *script_criacao_user.sql*

  

###  3️⃣ Rodar o projeto

Na raiz do projeto:

  

```bash

npm run  dev

```

  

###  🌐 URLs

-  **Frontend**: [http://localhost:5173](http://localhost:5173)

-  **Backend**: [http://localhost:4000](http://localhost:4000)