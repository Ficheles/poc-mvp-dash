const dm = require("../models/dashboardModel");

async function getDashboardData() {
  const [
    totalEnviados,
    naoSouEu,
    cancelamentoPromocoes,
    coberturaDisparos,
    taxaFalhas,
    tendenciaEnvios,
  ] = await Promise.all([
    dm.getTotalEnviados(),
    dm.getNaoSouEu(),
    dm.getCancelamentoPromocoes(),
    dm.getCoberturaDisparos(),
    dm.getTaxaFalhas(),
    dm.getTendenciaEnvios(),
  ]);

  return {
    stats: [
      {
        label: "Total Enviados",
        value: totalEnviados,
        color: "green",
        icon: "fa-paper-plane",
        sinal: "fa-arrow-up",
        percent: "12.5",
      },
      {
        label: "Não sou eu",
        value: naoSouEu,
        color: "red",
        icon: "fa-user-xmark",
        sinal: "fa-arrow-up",
        percent: "3.2",
      },
      {
        label: "Cancelamento de Promoções",
        value: cancelamentoPromocoes,
        color: "orange",
        icon: "fa-ban ",
        sinal: "fa-arrow-down",
        percent: "5.1",
      },
    ],
    circles: [
      {
        title: "Cobertura dos Disparos",
        value: coberturaDisparos,
        label: "Sucesso",
        color: "blue",
      },
      {
        title: "Taxa de Falhas",
        value: taxaFalhas,
        label: "Falhas",
        color: "red",
      },
    ],
    chartData: JSON.stringify({
      series: [
        {
          name: "Envios",
          data: tendenciaEnvios.map(i => i.total_envios),
        },
        {
          name: "Falhas",
          data: tendenciaEnvios.map(i => i.falhas),
        },
      ],
      categories: tendenciaEnvios.map(i => i.dia),
    }),
  };
}

module.exports = { getDashboardData };
