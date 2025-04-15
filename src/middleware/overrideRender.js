const path = require('path');
const fs = require('fs');
const mustache = require('mustache');

function overrideRender(defaultLayout = 'layouts/main') {
  return (req, res, next) => {
    const originalRender = res.render;

    res.render = (view, data = {}, callback) => {
      const layout = data.layout || null;

      // Se nenhum layout for especificado, usa o render normal
      if (!layout) {
        return originalRender.call(res, view, data, callback);
      }

      // Remove o layout dos dados (não queremos passar para a view)
      const viewData = { ...data };
      delete viewData.layout;

      // Renderiza a view interna
      originalRender.call(res, view, viewData, (err, renderedView) => {
        if (err) {
          if (typeof callback === 'function') return callback(err);
          return next(err);
        }

        // Carrega o layout
        const layoutPath = path.join(__dirname, '..', 'views', `${layout}.mustache`);
        fs.readFile(layoutPath, 'utf8', (err, layoutTemplate) => {
          if (err) {
            if (typeof callback === 'function') return callback(err);
            return next(err);
          }

          // Renderiza o layout com o conteúdo da view embutido
          const fullHtml = mustache.render(layoutTemplate, {
            ...viewData,
            body: renderedView,
          });

          res.send(fullHtml);
        });
      });
    };

    next();
  };
}

module.exports = overrideRender;
