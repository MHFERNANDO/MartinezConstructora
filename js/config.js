/* Conexión con Supabase. Se llena una sola vez (ver supabase/setup.sql).
   La "anon key" es pública por diseño: la seguridad la dan las reglas del setup.sql. */
window.MC_CONFIG = {
  SUPABASE_URL: "https://nyoufurtrxbioxxtozny.supabase.co",   // ej: "https://abcdxyz.supabase.co"
  SUPABASE_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55b3VmdXJ0cnhiaW94eHRvem55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0NDkyMjgsImV4cCI6MjEwODAyNTIyOH0.VPdrB_GXNOzcb90b4GyCTMfMvbkKEnS5KlzcXA5rd78"    // la clave "anon public"
};
