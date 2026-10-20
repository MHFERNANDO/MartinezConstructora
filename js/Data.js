/* =========================================================
   MARTÍNEZ CONSTRUCTORA — Datos compartidos (inicio y proyectos)
   ========================================================= */

/* Los proyectos ya no se escriben aquí: se publican desde admin.html y se guardan en Supabase. */
const PROYECTOS_LOCALES = [];  // vacío a propósito: los proyectos se administran desde admin.html

/* Si Supabase está configurado (js/config.js), los proyectos vienen de la base de datos
   y se administran desde admin.html. Si no, no se muestra ninguno. */
let PROYECTOS = PROYECTOS_LOCALES;
async function cargarProyectos() {
  const cfg = window.MC_CONFIG || {};
  if (!cfg.SUPABASE_URL || !cfg.SUPABASE_KEY) {
    console.warn("[Martínez] js/config.js no está cargado o está vacío: no se puede leer la base de datos.");
    return;
  }
  try {
    // Las claves antiguas (eyJ...) también se envían como Authorization; las nuevas (sb_publishable_...) solo como apikey
    const headers = { apikey: cfg.SUPABASE_KEY };
    if (cfg.SUPABASE_KEY.startsWith("eyJ")) headers.Authorization = `Bearer ${cfg.SUPABASE_KEY}`;
    const r = await fetch(`${cfg.SUPABASE_URL.replace(/\/+$/, "")}/rest/v1/proyectos?select=*&order=creado.desc`, { headers });
    if (!r.ok) throw new Error("respuesta " + r.status);
    PROYECTOS = await r.json();
    console.info(`[Martínez] ${PROYECTOS.length} proyecto(s) cargado(s) desde Supabase.`);
  } catch (e) { console.warn("[Martínez] No se pudo leer la base de datos:", e); }
}

/* Número de WhatsApp (formato internacional, sin + ni espacios) */
const WHATSAPP = "593995403075";
