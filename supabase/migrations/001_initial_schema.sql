-- ============================================================
-- 001_initial_schema.sql
-- Initial CRM schema for Supabase
-- Creates all tables, indexes, and RLS policies
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'vendedor' check (role in ('admin', 'vendedor')),
  phone text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (id = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can create their own profile"
  on profiles for insert
  with check (id = auth.uid());

create policy "Users can update own profile"
  on profiles for update
  using (id = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can delete own profile"
  on profiles for delete
  using (id = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ============================================================
-- PROSPECTS
-- ============================================================
create table prospects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text,
  email text,
  origin text,
  type text,
  interest text,
  notes text,
  status text not null default 'Nuevo' check (status in ('Nuevo','Contactado','Interesado','Cotización enviada','Seguimiento','Ganado','Perdido','Archivado')),
  priority text not null default 'Media' check (priority in ('Crítica','Alta','Media','Baja')),
  next_action text,
  next_action_date date,
  assigned_to uuid references profiles(id),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table prospects enable row level security;

create policy "Users can view own prospects"
  on prospects for select
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can create prospects"
  on prospects for insert
  with check (true);

create policy "Users can update own prospects"
  on prospects for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can soft-delete own prospects"
  on prospects for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ============================================================
-- CLIENTS
-- ============================================================
create table clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  phone text,
  email text,
  address text,
  website text,
  notes text,
  status text not null default 'Activo' check (status in ('Activo','Inactivo','VIP','Bloqueado')),
  type text,
  assigned_to uuid references profiles(id),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table clients enable row level security;

create policy "Users can view own clients"
  on clients for select
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can create clients"
  on clients for insert
  with check (true);

create policy "Users can update own clients"
  on clients for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can soft-delete own clients"
  on clients for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ============================================================
-- FOLLOWUPS
-- ============================================================
create table followups (
  id uuid primary key default gen_random_uuid(),
  prospect_id uuid references prospects(id),
  client_id uuid references clients(id),
  followup_type text not null default 'Llamada' check (followup_type in ('Llamada','Email','Visita','Reunión','Demo','Otro')),
  description text,
  result text,
  status text not null default 'Pendiente' check (status in ('Pendiente','Completado','Cancelado','Reprogramado')),
  scheduled_at timestamptz,
  completed_at timestamptz,
  assigned_to uuid references profiles(id),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table followups enable row level security;

create policy "Users can view own followups"
  on followups for select
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can create followups"
  on followups for insert
  with check (true);

create policy "Users can update own followups"
  on followups for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can soft-delete own followups"
  on followups for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ============================================================
-- QUOTES
-- ============================================================
create table quotes (
  id uuid primary key default gen_random_uuid(),
  quote_number text,
  prospect_id uuid references prospects(id),
  client_id uuid references clients(id),
  items jsonb default '[]'::jsonb,
  subtotal numeric(12,2) default 0,
  tax numeric(12,2) default 0,
  discount numeric(12,2) default 0,
  total numeric(12,2) default 0,
  currency text default 'MXN',
  valid_until date,
  status text not null default 'Borrador' check (status in ('Borrador','Enviada','Aprobada','Rechazada','Cancelada','Convertida')),
  notes text,
  assigned_to uuid references profiles(id),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table quotes enable row level security;

create policy "Users can view own quotes"
  on quotes for select
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can create quotes"
  on quotes for insert
  with check (true);

create policy "Users can update own quotes"
  on quotes for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can soft-delete own quotes"
  on quotes for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ============================================================
-- TASKS
-- ============================================================
create table tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  status text not null default 'Pendiente' check (status in ('Pendiente','En progreso','Completada','Cancelada')),
  priority text not null default 'Media' check (priority in ('Crítica','Alta','Media','Baja')),
  due_date timestamptz,
  completed_at timestamptz,
  related_to text,
  related_id uuid,
  assigned_to uuid references profiles(id),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table tasks enable row level security;

create policy "Users can view own tasks"
  on tasks for select
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can create tasks"
  on tasks for insert
  with check (true);

create policy "Users can update own tasks"
  on tasks for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can soft-delete own tasks"
  on tasks for update
  using (assigned_to = auth.uid() or created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ============================================================
-- ACTIVITIES (audit / activity log)
-- ============================================================
create table activities (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  description text,
  metadata jsonb default '{}'::jsonb,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table activities enable row level security;

create policy "Users can view own activities"
  on activities for select
  using (created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can create activities"
  on activities for insert
  with check (true);

create policy "Users can update own activities"
  on activities for update
  using (created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

create policy "Users can soft-delete own activities"
  on activities for update
  using (created_by = auth.uid() or exists(select 1 from profiles where id = auth.uid() and role = 'admin'));

-- ============================================================
-- INDEXES
-- ============================================================

-- Profiles
create index idx_profiles_role on profiles(role);

-- Prospects
create index idx_prospects_assigned_to on prospects(assigned_to);
create index idx_prospects_created_by on prospects(created_by);
create index idx_prospects_status on prospects(status);
create index idx_prospects_priority on prospects(priority);
create index idx_prospects_deleted_at on prospects(deleted_at);
create index idx_prospects_assigned_to_status on prospects(assigned_to, status);
create index idx_prospects_next_action_date on prospects(next_action_date);

-- Clients
create index idx_clients_assigned_to on clients(assigned_to);
create index idx_clients_created_by on clients(created_by);
create index idx_clients_status on clients(status);
create index idx_clients_deleted_at on clients(deleted_at);

-- Followups
create index idx_followups_prospect_id on followups(prospect_id);
create index idx_followups_client_id on followups(client_id);
create index idx_followups_assigned_to on followups(assigned_to);
create index idx_followups_created_by on followups(created_by);
create index idx_followups_status on followups(status);
create index idx_followups_scheduled_at on followups(scheduled_at);
create index idx_followups_deleted_at on followups(deleted_at);

-- Quotes
create index idx_quotes_prospect_id on quotes(prospect_id);
create index idx_quotes_client_id on quotes(client_id);
create index idx_quotes_assigned_to on quotes(assigned_to);
create index idx_quotes_created_by on quotes(created_by);
create index idx_quotes_status on quotes(status);
create index idx_quotes_deleted_at on quotes(deleted_at);

-- Tasks
create index idx_tasks_assigned_to on tasks(assigned_to);
create index idx_tasks_created_by on tasks(created_by);
create index idx_tasks_status on tasks(status);
create index idx_tasks_due_date on tasks(due_date);
create index idx_tasks_deleted_at on tasks(deleted_at);

-- Activities
create index idx_activities_created_by on activities(created_by);
create index idx_activities_entity_type on activities(entity_type);
create index idx_activities_entity_id on activities(entity_id);
create index idx_activities_created_at on activities(created_at desc);
create index idx_activities_deleted_at on activities(deleted_at);
