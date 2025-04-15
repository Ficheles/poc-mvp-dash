const express = require("express");
// const mustacheExpress = require("mustache-express");
const exphbs = require('express-handlebars');
const path = require("path");
const routes = require("./routes");
const errorHandler = require('./utils/error');
const overrideRender = require("./middleware/overrideRender");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");

require("dotenv").config();

const app = express();
const DOMAIN = process.env.DOMAIN || "localhost";
const PORT = process.env.PORT || 3000;

// // Configura Mustache
// app.engine("mustache", mustacheExpress());
// app.set("view engine", "mustache");
// app.set("views", path.join(__dirname, "views"));

// Configuração do Handlebars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  partialsDir: path.join(__dirname, 'views', 'partials'),
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware que sobrescreve o res.render
// app.use(overrideRender());

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Rotas
app.use("/", routes);

// **Middleware para rotas não encontradas** 
app.use(notFoundMiddleware);

// // Handler genérico
app.use(errorHandler());

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://${DOMAIN}:${PORT}`);
});
