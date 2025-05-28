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
    SELECT COUNT(distinct ( CASE
                                WHEN LENGTH(REGEXP_REPLACE(numero, '[^0-9]', '', 'g')) = 13 THEN
                                  CONCAT(
                                    SUBSTRING(REGEXP_REPLACE(numero, '[^0-9]', '', 'g') FROM 1 FOR 4),
                                    SUBSTRING(REGEXP_REPLACE(numero, '[^0-9]', '', 'g') FROM 6)
                                  )
                                ELSE
                                  REGEXP_REPLACE(numero, '[^0-9]', '', 'g')
                              END )) AS total_nao_sou_eu
    FROM public.jocros_retorno
    WHERE LOWER(retorno) LIKE '%bloquear%';
  `);
    return result.rows[0].total_nao_sou_eu;
  } catch (e) {
    return 0;
  }
}

async function getCancelamentoPromocoes() {
  try {
    const result = await db.query(`
      SELECT COUNT(distinct ( CASE
                                WHEN LENGTH(REGEXP_REPLACE(numero, '[^0-9]', '', 'g')) = 13 THEN
                                  CONCAT(
                                    SUBSTRING(REGEXP_REPLACE(numero, '[^0-9]', '', 'g') FROM 1 FOR 4),
                                    SUBSTRING(REGEXP_REPLACE(numero, '[^0-9]', '', 'g') FROM 6)
                                  )
                                ELSE
                                  REGEXP_REPLACE(numero, '[^0-9]', '', 'g')
                              END )) AS total_cancelamento
    FROM public.jocros_retorno
    WHERE LOWER(retorno) LIKE '%reduzir%' OR LOWER(retorno) LIKE '%cuidad%';  
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
        NULLIF(COUNT(*) FILTER (WHERE  "Corretor_Envio" IS not NULL), 0) * 100.0 / 
        COUNT(*) FILTER (WHERE status ILIKE '%accepted%'),
        2
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
        NULLIF(COUNT(*) FILTER (WHERE  "Corretor_Envio" IS NULL), 0) * 100.0 / 
        COUNT(*) FILTER (WHERE status ILIKE '%accepted%'),
        2
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
      SUM(case when status_envio IS NULL then 1 else 0 end ) as falhas
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
