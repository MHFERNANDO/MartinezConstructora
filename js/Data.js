/* =========================================================
   MARTÍNEZ CONSTRUCTORA — Datos compartidos (inicio y proyectos)
   ========================================================= */

/* ---------------------------------------------------------
   PROYECTOS
   Para agregar un proyecto, copia un bloque { ... } y cambia
   sus datos. "categoria" debe ser: residencial, comercial
   o remodelacion. "estado": "Entregado" o "En construcción".
   "destacado: true" hace que aparezca también en el inicio (máx. 4).
   Las fotos reales van en assets/img/ (ej: "assets/img/casa-1.jpg").
   --------------------------------------------------------- */
const PROYECTOS = [
  {
    titulo: "Residencia Los Pinos",
    destacado: true,
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
    destacado: true,
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
    destacado: true,
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
    destacado: true,
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