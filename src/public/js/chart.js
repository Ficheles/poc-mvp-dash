document.addEventListener("DOMContentLoaded", function () {
  if (!window.chartData) return;

  var options = {
    series: window.chartData.series,
    chart: { height: 350, type: "area" },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      type: "datetime",
      categories: window.chartData.categories,
    },
    tooltip: { x: { format: "dd/MM/yy HH:mm" } },
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
});
