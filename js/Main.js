/* =========================================================
   MARTÍNEZ CONSTRUCTORA — Interacciones
   ========================================================= */

/* ---------------------------------------------------------
   PROYECTOS
   Para agregar un proyecto, copia un bloque { ... } y cambia
   sus datos. "categoria" debe ser: residencial, comercial
   o remodelacion. "estado": "Entregado" o "En construcción".
   Las fotos reales van en assets/img/ (ej: "assets/img/casa-1.jpg").
   --------------------------------------------------------- */
const PROYECTOS = [
  {
    titulo: "Residencia Los Pinos",
    categoria: "residencial",
    estado: "En construcción",
    ubicacion: "Zona residencial norte",
    area: "420 m²",
    anio: "2026",
    imagen: "assets/img/residencia-render.jpg",
    descripcion: "Vivienda de dos plantas con fachada en piedra natural, voladizo de hormigón y aleros de madera. Grandes ventanales hacia el jardín y terraza con piscina."
  },
  {
    titulo: "Casa Mirador",
    categoria: "residencial",
    estado: "Entregado",
    ubicacion: "Vía a la montaña",
    area: "310 m²",
    anio: "2025",
    imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    descripcion: "Casa de líneas rectas con doble altura en la sala, cubierta plana y amplias áreas sociales integradas al exterior."
  },
  {
    titulo: "Villa Alameda",
    categoria: "residencial",
    estado: "Entregado",
    ubicacion: "Urbanización privada",
    area: "520 m²",
    anio: "2024",
    imagen: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=80",
    descripcion: "Residencia de lujo con piscina, cuatro dormitorios en suite y acabados importados en pisos y carpintería."
  },
  {
    titulo: "Edificio Centro Empresarial",
    categoria: "comercial",
    estado: "En construcción",
    ubicacion: "Av. principal, zona comercial",
    area: "1.800 m²",
    anio: "2026",
    imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    descripcion: "Edificio de oficinas y locales comerciales en planta baja, con fachada de vidrio y estacionamientos subterráneos."
  },
  {
    titulo: "Casa Jardín",
    categoria: "residencial",
    estado: "Entregado",
    ubicacion: "Sector valle",
    area: "260 m²",
    anio: "2023",
    imagen: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    descripcion: "Vivienda familiar de una planta, pensada para la vida al aire libre, con patio central y cubierta verde."
  },
  {
    titulo: "Remodelación Departamento Norte",
    categoria: "remodelacion",
    estado: "Entregado",
    ubicacion: "Edificio residencial",
    area: "140 m²",
    anio: "2025",
    imagen: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    descripcion: "Redistribución completa de áreas sociales, cocina abierta, iluminación nueva y pisos de porcelanato de gran formato."
  },
  {
    titulo: "Locales Plaza Sur",
    categoria: "comercial",
    estado: "Entregado",
    ubicacion: "Zona sur",
    area: "650 m²",
    anio: "2024",
    imagen: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80",
    descripcion: "Conjunto de seis locales comerciales con estructura metálica y fachada ventilada."
  },
  {
    titulo: "Cocina y áreas sociales Casa R.",
    categoria: "remodelacion",
    estado: "Entregado",
    ubicacion: "Urbanización privada",
    area: "85 m²",
    anio: "2023",
    imagen: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80",
    descripcion: "Remodelación de cocina con isla central, mesones de cuarzo y muebles a medida."
  }
];

/* Número de WhatsApp (formato internacional, sin + ni espacios) */
const WHATSAPP = "593995403075";

/* --------------------------------------------------------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Imagen que no carga → fondo con la marca ---------- */
function protectImage(img) {
  const fail = () => img.parentElement && img.parentElement.classList.add("img-fallback");
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fail();
  img.addEventListener("error", fail, { once: true });
}

/* ---------- Preloader y entrada del hero ---------- */
function initIntro() {
  $$("[data-hero]").forEach((el, i) => el.style.setProperty("--d", `${0.55 + i * 0.12}s`));

  const start = performance.now();
  const MIN = reduceMotion ? 0 : 1500;   // deja que el logo se dibuje
  let done = false;

  const ready = () => {
    if (done) return;
    done = true;
    const wait = Math.max(0, MIN - (performance.now() - start));
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
    }, wait);
  };

  if (document.readyState === "complete") ready();
  else window.addEventListener("load", ready);
  setTimeout(ready, 4000); // por si alguna imagen tarda demasiado
}

/* ---------- Header: fondo al bajar y se oculta al hacer scroll hacia abajo ---------- */
function initHeader() {
  const header = $("#header");
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    const goingDown = y > lastY && y > 600;
    if (!document.body.classList.contains("menu-open")) {
      header.classList.toggle("is-hidden", goingDown);
    }
    lastY = y;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- Menú móvil ---------- */
function initMenu() {
  const burger = $("#burger");
  const nav = $("#main-nav");

  $$(".main-nav__link", nav).forEach((a, i) => a.style.setProperty("--i", i));

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    document.body.classList.toggle("menu-open", open);
  };

  burger.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      burger.focus();
    }
  });
  window.matchMedia("(min-width: 1041px)").addEventListener("change", (e) => e.matches && setOpen(false));
}

/* ---------- Enlace activo según la sección visible ---------- */
function initActiveLink() {
  const links = $$(".main-nav__link");
  const map = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.remove("is-current"));
      const link = map.get(entry.target.id);
      if (link) link.classList.add("is-current");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  $$("main section[id]").forEach((s) => io.observe(s));
}

/* ---------- Aparición suave al hacer scroll ---------- */
function initReveal() {
  const items = $$(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }

  // escalona elementos hermanos para que no aparezcan todos a la vez
  items.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.setProperty("--d", `${Math.min(idx * 0.1, 0.5)}s`);
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  items.forEach((el) => io.observe(el));
}

/* ---------- Contadores ---------- */
function initCounters() {
  const nodes = $$("[data-count]");
  const format = (n, el) =>
    el.dataset.format === "thousands" ? n.toLocaleString("es-EC") : String(n);

  const run = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) { el.textContent = format(target, el); return; }
    const dur = 1800;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = format(Math.round(target * eased), el);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.6 });

  nodes.forEach((n) => io.observe(n));
}

/* ---------- Parallax suave del hero ---------- */
function initParallax() {
  if (reduceMotion) return;
  const media = $(".hero__media");
  const lines = $(".hero__lines");
  const hero = $(".hero");
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    if (y < hero.offsetHeight) {
      media.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
      lines.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
    }
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* ---------- Servicios: acordeón + imagen que cambia ---------- */
function initServices() {
  const items = $$(".service");
  const imgs = $$(".services__img");
  let front = 0;

  const showImage = (src) => {
    if (!src || imgs[front].getAttribute("src") === src) return;
    const back = 1 - front;
    imgs[back].src = src;
    const swap = () => {
      imgs[back].classList.add("is-visible");
      imgs[front].classList.remove("is-visible");
      front = back;
    };
    if (imgs[back].complete) swap();
    else imgs[back].addEventListener("load", swap, { once: true });
  };

  const activate = (item) => {
    items.forEach((it) => {
      const on = it === item;
      it.classList.toggle("is-active", on);
      $(".service__btn", it).setAttribute("aria-expanded", String(on));
    });
    showImage(item.dataset.img);
  };

  items.forEach((item) => {
    const btn = $(".service__btn", item);
    btn.addEventListener("click", () => activate(item));
    // en escritorio también cambia al pasar el cursor
    item.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover) and (min-width: 1041px)").matches) activate(item);
    });
  });

  // precarga de imágenes de servicios
  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => items.forEach((it) => { new Image().src = it.dataset.img; }));
  }
}

/* ---------- Proyectos: render, filtros y modal ---------- */
function initProjects() {
  const grid = $("#projects-grid");
  const filters = $$(".filter");
  const pattern = ["card--wide", "", "card--tall", "", "", "card--wide"];
  let visible = PROYECTOS.map((p, i) => i);

  const render = (filter) => {
    visible = PROYECTOS
      .map((p, i) => ({ p, i }))
      .filter(({ p }) => filter === "todos" || p.categoria === filter)
      .map(({ i }) => i);

    if (!visible.length) {
      grid.innerHTML = `<p class="projects__empty">Aún no hay proyectos en esta categoría.</p>`;
      return;
    }

    grid.innerHTML = visible.map((idx, n) => {
      const p = PROYECTOS[idx];
      const size =
        visible.length === 1 ? "card--full" :
        visible.length === 2 ? (n === 0 ? "card--wide" : "") :
        pattern[n % pattern.length];
      const obra = p.estado.toLowerCase().includes("constru") ? " card__status--obra" : "";
      return `
        <button class="card ${size}" type="button" data-index="${idx}" style="--d:${n * 0.07}s"
          aria-label="Ver detalles de ${p.titulo}">
          <img class="card__img" src="${p.imagen}" alt="" loading="lazy">
          <span class="card__info">
            <span class="card__status${obra}">${p.estado}</span>
            <span class="card__title">${p.titulo}</span>
            <span class="card__place">${p.ubicacion}</span>
            <span class="card__more">Ver detalles</span>
          </span>
        </button>`;
    }).join("");

    $$(".card__img", grid).forEach(protectImage);
  };

  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-active")) return;
      filters.forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      grid.classList.add("is-switching");
      setTimeout(() => {
        render(btn.dataset.filter);
        grid.classList.remove("is-switching");
      }, reduceMotion ? 0 : 280);
    });
  });

  /* Modal */
  const modal = $("#project-modal");
  const panel = $(".modal__panel", modal);
  const img = $("#modal-img");
  let current = 0;
  let lastFocus = null;

  const fill = (idx) => {
    const p = PROYECTOS[idx];
    current = idx;
    img.parentElement.classList.remove("img-fallback");
    img.src = p.imagen;
    img.alt = p.titulo;
    $("#modal-status").textContent = p.estado;
    $("#modal-title").textContent = p.titulo;
    $("#modal-desc").textContent = p.descripcion;
    $("#modal-specs").innerHTML = [
      ["Ubicación", p.ubicacion],
      ["Área", p.area],
      ["Año", p.anio],
      ["Tipo", { residencial: "Residencial", comercial: "Comercial", remodelacion: "Remodelación" }[p.categoria]]
    ].map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
    $("#modal-cta").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
      `Hola, vi el proyecto "${p.titulo}" en su página y quisiera algo similar.`
    )}`;
    $("#modal-cta").target = "_blank";
    $("#modal-cta").rel = "noopener";
  };
  protectImage(img);

  const open = (idx) => {
    lastFocus = document.activeElement;
    fill(idx);
    modal.hidden = false;
    document.body.classList.add("modal-open");
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("is-open")));
    $(".modal__close", modal).focus();
  };

  const close = () => {
    modal.classList.remove("is-open");
    document.body.classList.remove("modal-open");
    setTimeout(() => { modal.hidden = true; }, reduceMotion ? 0 : 450);
    if (lastFocus) lastFocus.focus();
  };

  const step = (dir) => {
    const pos = visible.indexOf(current);
    const next = visible[(pos + dir + visible.length) % visible.length];
    panel.style.opacity = ".4";
    setTimeout(() => { fill(next); panel.style.opacity = ""; }, reduceMotion ? 0 : 180);
  };

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) open(Number(card.dataset.index));
  });

  $$("[data-close]", modal).forEach((el) => el.addEventListener("click", close));
  $$("[data-step]", modal).forEach((el) => el.addEventListener("click", () => step(Number(el.dataset.step))));

  document.addEventListener("keydown", (e) => {
    if (modal.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "Tab") {
      // mantiene el foco dentro del modal
      const focusables = $$("button, a[href]", panel).filter((el) => el.offsetParent !== null);
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  render("todos");
}

/* ---------- Línea del proceso que avanza con el scroll ---------- */
function initProcess() {
  const wrap = $("#process-steps");
  const fill = $(".process__fill", wrap);
  const steps = $$(".step", wrap);
  let ticking = false;

  const update = () => {
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const vertical = window.matchMedia("(max-width: 1040px)").matches;
    const startAt = vh * 0.8;
    const total = vertical ? rect.height : rect.height + vh * 0.35;
    const p = Math.min(Math.max((startAt - rect.top) / total, 0), 1);
    fill.style.setProperty("--progress", p.toFixed(3));
    steps.forEach((s, i) => s.classList.toggle("is-reached", p >= (i / steps.length) + 0.02));
    ticking = false;
  };

  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* ---------- Testimonios ---------- */
function initSlider() {
  const slider = $("#slider");
  const slides = $$(".slide", slider);
  const dotsWrap = $(".slider__dots", slider);
  const TIME = 7000;
  let index = 0;
  let timer = null;

  slider.style.setProperty("--slide-time", `${TIME}ms`);

  const dots = slides.map((_, i) => {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "slider__dot";
    d.setAttribute("role", "tab");
    d.setAttribute("aria-label", `Testimonio ${i + 1}`);
    d.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(d);
    return d;
  });

  const go = (i, user = false) => {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => {
      s.classList.toggle("is-active", n === index);
      s.setAttribute("aria-hidden", String(n !== index));
    });
    dots.forEach((d, n) => {
      d.classList.remove("is-active");
      d.setAttribute("aria-selected", String(n === index));
    });
    void dots[index].offsetWidth; // reinicia la animación de la barra
    dots[index].classList.add("is-active");
    if (user) restart();
  };

  const restart = () => {
    clearInterval(timer);
    if (!reduceMotion) timer = setInterval(() => { if (!slider.classList.contains("is-paused")) go(index + 1); }, TIME);
  };

  $$(".slider__arrow", slider).forEach((b) =>
    b.addEventListener("click", () => go(index + Number(b.dataset.dir), true))
  );

  slider.addEventListener("mouseenter", () => slider.classList.add("is-paused"));
  slider.addEventListener("mouseleave", () => slider.classList.remove("is-paused"));
  slider.addEventListener("focusin", () => slider.classList.add("is-paused"));
  slider.addEventListener("focusout", () => slider.classList.remove("is-paused"));

  // deslizar con el dedo
  let x0 = null;
  slider.addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener("touchend", (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 45) go(index + (dx < 0 ? 1 : -1), true);
    x0 = null;
  });

  go(0);
  restart();
}

/* ---------- Formulario → WhatsApp ---------- */
function initForm() {
  const form = $("#contact-form");

  const setError = (input, msg) => {
    const field = input.closest(".field");
    field.classList.toggle("is-invalid", Boolean(msg));
    $(".field__error", field).textContent = msg || "";
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  };

  const validate = () => {
    const nombre = form.nombre;
    const tel = form.telefono;
    let ok = true;

    if (nombre.value.trim().length < 2) { setError(nombre, "Escribe tu nombre."); ok = false; }
    else setError(nombre, "");

    const digits = tel.value.replace(/\D/g, "");
    if (digits.length < 7) { setError(tel, "Escribe un teléfono de al menos 7 dígitos."); ok = false; }
    else setError(tel, "");

    return ok;
  };

  [form.nombre, form.telefono].forEach((el) =>
    el.addEventListener("blur", () => { if (el.value) validate(); })
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) {
      form.querySelector(".is-invalid input").focus();
      return;
    }
    const msg =
      `Hola, soy ${form.nombre.value.trim()}.\n` +
      `Me interesa: ${form.tipo.value}.\n` +
      (form.mensaje.value.trim() ? `${form.mensaje.value.trim()}\n` : "") +
      `Mi teléfono: ${form.telefono.value.trim()}`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });
}

/* ---------- Inicio ---------- */
document.addEventListener("DOMContentLoaded", () => {
  initIntro();
  initHeader();
  initMenu();
  initActiveLink();
  initReveal();
  initCounters();
  initParallax();
  initServices();
  initProjects();
  initProcess();
  initSlider();
  initForm();

  $$(".hero__img, .about__figure img").forEach(protectImage);
  const y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
});