const db = require("../config/db");

async function getTotalEnviados() {
  try {
    const result = await db.query(`
    SELECT COUNT(*) AS total_enviados
    FROM public."JoCross_Status"
    WHERE status IS NOT NULL;
  `);
    return result.rows[0].total_enviados;
  } catch (e) {
    return 0;
  }
}

async function getNaoSouEu() {
  try {
    const result = await db.query(`
    SELECT COUNT(*) AS total_nao_sou_eu
    FROM public."JoCross_Status"
    WHERE LOWER(interacao_usuario) LIKE '%não sou eu%';
  `);
    return result.rows[0].total_nao_sou_eu;
  } catch (e) {
    return 0;
  }
}

async function getCancelamentoPromocoes() {
  try {
    const result = await db.query(`
    SELECT COUNT(*) AS total_cancelamento
    FROM public."JoCross_Status"
    WHERE LOWER(interacao_usuario) LIKE '%cancel%' OR LOWER(interacao_usuario) LIKE '%parar%';
  `);
    return result.rows[0].total_cancelamento;
  } catch (e) {
    return 0;
  }
}

async function getCoberturaDisparos() {
  try {
    const result = await db.query(`
    SELECT 
      ROUND(
        COUNT(*) FILTER (WHERE status ILIKE '%accepted%') * 100.0 / 
        NULLIF(COUNT(*) FILTER (WHERE status IS NOT NULL), 0),
        1
      ) AS cobertura_disparos_percent
    FROM public."JoCross_Status";
  `);
    return result.rows[0].cobertura_disparos_percent;
  } catch (e) {
    return 0;
  }
}

async function getTaxaFalhas() {
  try {
    const result = await db.query(`
      SELECT 
      ROUND(
        COUNT(*) FILTER (WHERE status ILIKE '%falha%' OR status ILIKE '%erro%') * 100.0 / 
        NULLIF(COUNT(*) FILTER (WHERE status IS NOT NULL), 0),
        1
        ) AS taxa_falhas_percent
        FROM public."JoCross_Status";
        `);
    return result.rows[0].taxa_falhas_percent;
  } catch (e) {
    return 0;
  }
}

async function getTendenciaEnvios() {
  try {
    const result = await db.query(`
    SELECT 
      DATE(created_at) AS dia,
      COUNT(*) AS total_envios,
      SUM(case when interacao_usuario IS NOT NULL then 1 else 0 end ) as falhas
    FROM public."JoCross_Status"
    WHERE status IS NOT NULL
    GROUP BY 1
    ORDER BY 1;
  `);

    return result.rows;
  } catch (e) {
    return [{ dia: 0, total_envios: 0, falhas: 0 }];
  }
}

module.exports = {
  getTotalEnviados,
  getNaoSouEu,
  getCancelamentoPromocoes,
  getCoberturaDisparos,
  getTaxaFalhas,
  getTendenciaEnvios,
};
