/* Panel de administración — Martínez Constructora */
const $ = (s) => document.querySelector(s);
const cfg = window.MC_CONFIG || {};
const BUCKET = "proyectos";
const MAX_FOTOS = 10;
let editing = null;
let fotos = [];      // cada una: { full, thumb } (ya subida) o { file, preview } (nueva)
let original = [];   // rutas guardadas antes de editar, para limpiar las que se quiten

const say = (el, text, err) => { el.textContent = text; el.className = "msg " + (err ? "err" : "ok"); };

if (!cfg.SUPABASE_URL || !cfg.SUPABASE_KEY || !window.supabase) {
  say($("#login-msg"), "Falta configurar js/config.js (URL y clave de Supabase) o no hay internet.", true);
  $("#login-form").hidden = true;
} else {
  const db = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_KEY);

  const show = (session) => {
    $("#login").hidden = !!session;
    $("#app").hidden = !session;
    $("#who").hidden = !session;
    if (session) { $("#who-mail").textContent = session.user.email; load(); }
  };
  db.auth.getSession().then(({ data }) => show(data.session));

  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    say($("#login-msg"), "Entrando…");
    const { data, error } = await db.auth.signInWithPassword({ email: $("#email").value.trim(), password: $("#pass").value });
    if (error) return say($("#login-msg"), "Correo o contraseña incorrectos.", true);
    $("#pass").value = "";
    say($("#login-msg"), "");
    show(data.session);
  });
  $("#logout").addEventListener("click", async () => { await db.auth.signOut(); show(null); });

  /* ---------- Optimización automática de fotos ----------
     Cualquier foto (de celular, cámara, PNG…) se reduce y se convierte a WebP (o JPG si el navegador no soporta WebP):
     una versión "grande" de máx. 1600 px para la galería y una "miniatura" de 900 px para las tarjetas. */
  const WEBP = (() => { try { return document.createElement("canvas").toDataURL("image/webp").startsWith("data:image/webp"); } catch { return false; } })();
  const FMT = WEBP ? { mime: "image/webp", ext: "webp" } : { mime: "image/jpeg", ext: "jpg" };

  async function procesar(file, lado) {
    let bmp;
    try { bmp = await createImageBitmap(file); }
    catch { throw new Error(`"${file.name}" no es un formato compatible (usa JPG, PNG o WebP).`); }
    const k = Math.min(1, lado / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    return new Promise((ok) => c.toBlob(ok, FMT.mime, 0.82));
  }

  async function subir(blob, sufijo) {
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${sufijo}.${FMT.ext}`;
    const up = await db.storage.from(BUCKET).upload(path, blob, { contentType: FMT.mime, cacheControl: "31536000" });
    if (up.error) throw up.error;
    return db.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }

  const pathDe = (url) => (String(url || "").split(`/object/public/${BUCKET}/`)[1] || "");
  const rutas = (lista) => lista.flatMap((g) => [pathDe(g.full), pathDe(g.thumb)]).filter(Boolean);
  const galeriaDe = (p) => Array.isArray(p.galeria) && p.galeria.length
    ? p.galeria.map((g) => (typeof g === "string" ? { full: g, thumb: g } : g))
    : [{ full: p.imagen, thumb: p.imagen }];

  /* ---------- Selector de fotos ---------- */
  function pintarFotos() {
    const box = $("#thumbs");
    box.innerHTML = "";
    fotos.forEach((f, i) => {
      const tile = document.createElement("div");
      tile.className = "tile" + (i === 0 ? " cover" : "");
      const im = Object.assign(document.createElement("img"), { src: f.thumb || f.preview, alt: "" });
      const bar = document.createElement("div"); bar.className = "bar";
      const a = document.createElement("button"); a.type = "button";
      if (i === 0) a.textContent = "★ Portada";
      else { a.textContent = "Hacer portada"; a.onclick = () => { fotos.unshift(fotos.splice(i, 1)[0]); pintarFotos(); }; }
      const x = Object.assign(document.createElement("button"), { type: "button", textContent: "Quitar", onclick: () => { fotos.splice(i, 1); pintarFotos(); } });
      bar.append(a, x); tile.append(im, bar); box.append(tile);
    });
  }

  $("#foto").addEventListener("change", (e) => {
    for (const file of e.target.files) {
      if (fotos.length >= MAX_FOTOS) { say($("#msg"), `Máximo ${MAX_FOTOS} fotos por proyecto.`, true); break; }
      fotos.push({ file, preview: URL.createObjectURL(file) });
    }
    e.target.value = "";
    pintarFotos();
  });

  function reset() {
    editing = null; fotos = []; original = [];
    $("#project-form").reset();
    pintarFotos();
    $("#form-title").textContent = "Nuevo proyecto";
    $("#save").textContent = "Publicar proyecto";
    $("#cancel").hidden = true;
  }
  $("#cancel").addEventListener("click", () => { reset(); say($("#msg"), ""); });

  /* ---------- Guardar ---------- */
  $("#project-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!fotos.length) return say($("#msg"), "Sube al menos una foto.", true);
    const btn = $("#save"); btn.disabled = true;
    try {
      for (const [i, f] of fotos.entries()) {
        if (!f.file) continue;
        say($("#msg"), `Optimizando y subiendo foto ${i + 1} de ${fotos.length}…`);
        f.full = await subir(await procesar(f.file, 1600), "g");
        f.thumb = await subir(await procesar(f.file, 900), "m");
        delete f.file;
      }
      say($("#msg"), "Guardando…");
      const galeria = fotos.map((f) => ({ full: f.full, thumb: f.thumb }));
      const row = {
        titulo: $("#titulo").value.trim(), categoria: $("#categoria").value, estado: $("#estado").value,
        ubicacion: $("#ubicacion").value.trim(), area: $("#area").value.trim(), anio: $("#anio").value.trim(),
        descripcion: $("#descripcion").value.trim(), destacado: $("#destacado").checked,
        imagen: galeria[0].thumb, galeria
      };
      const res = editing ? await db.from("proyectos").update(row).eq("id", editing.id)
                          : await db.from("proyectos").insert(row);
      if (res.error) throw res.error;
      const keep = new Set(rutas(galeria));
      const sobran = original.filter((p) => !keep.has(p));
      if (sobran.length) db.storage.from(BUCKET).remove(sobran);
      say($("#msg"), editing ? "Cambios guardados." : "Proyecto publicado.");
      reset(); load();
    } catch (err) {
      say($("#msg"), "No se pudo guardar: " + (err.message || err), true);
    } finally { btn.disabled = false; }
  });

  /* ---------- Lista ---------- */
  async function load() {
    const { data, error } = await db.from("proyectos").select("*").order("creado", { ascending: false });
    const box = $("#list");
    box.innerHTML = "";
    const note = (cls, text) => box.append(Object.assign(document.createElement("p"), { className: cls, textContent: text }));
    if (error) return note("msg err", "No se pudo cargar: " + error.message);
    if (!data.length) return note("hint", "Aún no hay proyectos. Crea el primero arriba.");
    data.forEach((p) => {
      const row = document.createElement("div");
      row.className = "row";
      const img = Object.assign(document.createElement("img"), { src: p.imagen, alt: "" });
      const info = document.createElement("div");
      const n = galeriaDe(p).length;
      const t = document.createElement("strong"); t.textContent = p.titulo + (p.destacado ? "  ★" : "");
      const s = document.createElement("small"); s.textContent = `${p.estado} · ${p.categoria} · ${p.ubicacion} · ${n} foto${n === 1 ? "" : "s"}`;
      info.append(t, s);
      const acts = document.createElement("div"); acts.className = "acts";
      const ed = Object.assign(document.createElement("button"), { type: "button", className: "btn btn--ghost btn--sm", textContent: "Editar" });
      const del = Object.assign(document.createElement("button"), { type: "button", className: "btn btn--ghost btn--sm", textContent: "Eliminar" });
      ed.onclick = () => {
        editing = p;
        ["titulo", "categoria", "estado", "ubicacion", "area", "anio", "descripcion"].forEach((k) => { $("#" + k).value = p[k] || ""; });
        $("#destacado").checked = p.destacado;
        fotos = galeriaDe(p).map((g) => ({ full: g.full, thumb: g.thumb }));
        original = rutas(fotos);
        pintarFotos();
        $("#form-title").textContent = "Editar proyecto";
        $("#save").textContent = "Guardar cambios";
        $("#cancel").hidden = false;
        $("#project-form").scrollIntoView({ behavior: "smooth" });
      };
      del.onclick = async () => {
        if (!confirm(`¿Eliminar "${p.titulo}"? Esta acción no se puede deshacer.`)) return;
        const r = await db.from("proyectos").delete().eq("id", p.id);
        if (r.error) return say($("#msg"), "No se pudo eliminar: " + r.error.message, true);
        const paths = rutas(galeriaDe(p)); if (paths.length) db.storage.from(BUCKET).remove(paths);
        say($("#msg"), "Proyecto eliminado."); load();
      };
      acts.append(ed, del);
      row.append(img, info, acts);
      box.append(row);
    });
  }
}
