function errorHandler(defaultLayout = "main") {
  return (err, req, res, next) => {
    const status = err.status || 500; // Se não tiver status, assume 500 (erro interno)

    // Mapeia os erros HTTP para as views de erro correspondentes
    const viewMap = {
      401: "errors/401", // Não autorizado
      403: "errors/403", // Proibido
      404: "errors/404", // Não encontrado
      500: "errors/500", // Erro interno
    };

    // Se o status não estiver mapeado, usa '500' como fallback
    const errorView = viewMap[status] || "errors/500";

    // Definindo os dados para renderizar a página de erro
    const errorData = {
      title: `${status} - Erro`,
      message: err.message || "Ocorreu um erro inesperado.",
      layout: defaultLayout,
    };

    // Renderiza a view de erro com Mustache
    res.status(status).render(errorView, errorData);
  };
}

module.exports = errorHandler;
