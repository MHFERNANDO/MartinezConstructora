-- Ejecutar UNA VEZ en Supabase > SQL Editor > New query > Run
-- Agrega la columna para guardar varias fotos por proyecto.
alter table public.proyectos add column if not exists galeria jsonb not null default '[]'::jsonb;
