-- =====================================================================
-- MARTÍNEZ CONSTRUCTORA — Configuración de la base de datos (Supabase)
-- 1) Cambia CORREO_DEL_ADMIN (2 veces abajo) por el correo que usarás para entrar al panel (en minúsculas).
-- 2) Supabase > SQL Editor > New query > pega todo esto > Run.
-- =====================================================================

create table if not exists public.proyectos (
  id          uuid primary key default gen_random_uuid(),
  titulo      text not null,
  categoria   text not null check (categoria in ('residencial','comercial','remodelacion')),
  estado      text not null check (estado in ('Entregado','En construcción')),
  ubicacion   text not null,
  area        text,
  anio        text,
  descripcion text not null,
  imagen      text not null,
  galeria     jsonb not null default '[]'::jsonb,
  destacado   boolean not null default false,
  creado      timestamptz not null default now()
);

alter table public.proyectos enable row level security;

-- Cualquiera puede VER los proyectos (la página pública)
create policy "ver proyectos" on public.proyectos for select using (true);

-- Solo el correo del administrador puede crear, editar o borrar
create policy "admin escribe proyectos" on public.proyectos for all to authenticated
  using ((auth.jwt() ->> 'email') = 'fermarhug@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'fermarhug@gmail.com');

-- Carpeta pública para las fotos
insert into storage.buckets (id, name, public) values ('proyectos', 'proyectos', true)
on conflict (id) do nothing;

create policy "ver fotos" on storage.objects for select using (bucket_id = 'proyectos');

create policy "admin gestiona fotos" on storage.objects for all to authenticated
  using (bucket_id = 'proyectos' and (auth.jwt() ->> 'email') = 'fermarhug@gmaill.com')
  with check (bucket_id = 'proyectos' and (auth.jwt() ->> 'email') = 'fermarhug@gmail.com');
