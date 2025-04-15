// Middleware para capturar rotas não encontradas
function notFoundMiddleware(req, res, next) {
    const err = new Error('Página não encontrada');
    err.status = 404;
    next(err);  // Passa para o middleware de erro
  }
  
  module.exports = notFoundMiddleware;
  