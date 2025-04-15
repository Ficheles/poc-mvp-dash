# 📊 Dashboard Express com Mustache (Handlebars-like)

Este é um projeto de dashboard construído com **Node.js**, **Express** e templates utilizando **Mustache**, um motor de template semelhante ao Handlebars. O projeto é estruturado com rotas, controladores, middlewares de erro, e configurado para funcionar em ambiente de desenvolvimento com **Docker**.

---

## 🚀 Tecnologias

- Node.js
- Express.js
- Handlebars (via express-handlebars)
- Docker & Docker Compose
- dotenv para variáveis de ambiente
- Estrutura MVC
- Middlewares para tratamento de erros (401, 403, 404, 500)

---

## 📁 Estrutura de Diretórios

```
├── controllers/
│   └── dashboardController.js
├── middleware/
│   ├── errorHandler.js
│   └── notFoundMiddleware.js
├── routes/
│   └── dashboardRoutes.js
├── utils/
│   └── Error.js
├── views/
│   ├── layouts/
│   │   └── main.mustache
│   ├── errors/
│   │   ├── 401.mustache
│   │   ├── 403.mustache
│   │   ├── 404.mustache
│   │   └── 500.mustache
│   └── dashboard/
│       └── index.mustache
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── server.js
```

---

## 🧪 Executando o Projeto

### 🔧 Pré-requisitos

- Docker + Docker Compose ou Node.js instalado localmente

### 💻 Rodando com Docker (modo dev)

```bash
docker compose up --build
```

Acesse [http://localhost:3000](http://localhost:3000)

### 📦 Rodando localmente com Node

```bash
npm install
npm run dev
```

---

## 🛠 Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes configurações (exemplo):

```
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/db
```

---

## ⚠️ Tratamento de Erros

O projeto possui tratamento centralizado para erros HTTP:

- **401** – Não autorizado
- **403** – Acesso proibido
- **404** – Página não encontrada
- **500** – Erro interno do servidor

As views estão em `views/errors/*.mustache`.

---

## 🧩 Contribuições

Pull Requests são bem-vindos! 💜  
Sugestões, melhorias ou issues? Fique à vontade para abrir!

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
