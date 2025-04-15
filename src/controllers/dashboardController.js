// const dashboardModel = require("../models/dashboardModel");
const dashboardService = require('../services/dashboardService')

async function showDashboard(req, res) {
  try {
    const data = await dashboardService.getDashboardData();

    res.render("dashboard", {
      // layout: "main",
      title: "Dashboard",
      headerTitle: "Métricas de Envios",
      useApexCharts: true,
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao carregar dashboard");
  }
}

module.exports = { showDashboard };
