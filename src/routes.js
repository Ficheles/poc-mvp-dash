const express = require("express");
const router = express.Router();
const dashboardController = require("./controllers/dashboardController");

router.get("/", dashboardController.showDashboard);

router.get("/example", (req, res) => {
  res.render("example", {
    title: "Exemplo",
  });
});

// Exemplo de rota que dispara um erro 500 manualmente
router.get("/teste-erro", (req, res, next) => {
  const err = new Error("Erro Interno");
  err.status = 500;
  next(err); // Passa o erro para o middleware de erro
});

module.exports = router;
