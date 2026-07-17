-- ============================================================
-- KinerjaKu — Skema Database Supabase
-- Jalankan script ini di Supabase SQL Editor (Dashboard > SQL > New query)
-- ============================================================

-- ------------------------------------------------------------
-- 1. Tabel profiles (data pegawai)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  role text not null default 'Pegawai',
  avatar_url text,
  weekly_target_hours numeric(5, 2) not null default 40,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 2. Tabel reports (laporan kinerja harian)
--    Sumber data untuk kartu "Pengingat Laporan" & tabel
--    "Daftar Laporan Terkini".
-- ------------------------------------------------------------
create type report_status as enum ('menunggu', 'diterima', 'direvisi', 'draft');

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  category text not null,
  status report_status not null default 'draft',
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists reports_user_id_idx on public.reports (user_id);
create index if not exists reports_submitted_at_idx on public.reports (submitted_at desc);

-- ------------------------------------------------------------
-- 3. Tabel tasks (tugas / to-do)
--    Sumber data untuk kartu "Tugas Selesai" & pengingat.
-- ------------------------------------------------------------
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  category text not null,
  is_done boolean not null default false,
  due_date date,
  created_at timestamptz not null default now()
);

create index if not exists tasks_user_id_idx on public.tasks (user_id);

-- ------------------------------------------------------------
-- 4. Tabel attendance (absensi clock in/out)
--    Sumber data untuk kartu "Jam Kerja" & widget Clock In.
-- ------------------------------------------------------------
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  clock_in timestamptz,
  clock_out timestamptz,
  work_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists attendance_user_id_idx on public.attendance (user_id);
create index if not exists attendance_work_date_idx on public.attendance (work_date);

-- ============================================================
-- Row Level Security (RLS)
-- Pengguna hanya bisa melihat & memodifikasi data miliknya sendiri.
-- ============================================================
alter table public.profiles   enable row level security;
alter table public.reports    enable row level security;
alter table public.tasks      enable row level security;
alter table public.attendance enable row level security;

-- profiles
create policy "Profiles read own" on public.profiles
  for select using (auth.uid() = id);
create policy "Profiles update own" on public.profiles
  for update using (auth.uid() = id);

-- reports
create policy "Reports read own" on public.reports
  for select using (auth.uid() = user_id);
create policy "Reports insert own" on public.reports
  for insert with check (auth.uid() = user_id);
create policy "Reports update own" on public.reports
  for update using (auth.uid() = user_id);
create policy "Reports delete own" on public.reports
  for delete using (auth.uid() = user_id);

-- tasks
create policy "Tasks read own" on public.tasks
  for select using (auth.uid() = user_id);
create policy "Tasks insert own" on public.tasks
  for insert with check (auth.uid() = user_id);
create policy "Tasks update own" on public.tasks
  for update using (auth.uid() = user_id);
create policy "Tasks delete own" on public.tasks
  for delete using (auth.uid() = user_id);

-- attendance
create policy "Attendance read own" on public.attendance
  for select using (auth.uid() = user_id);
create policy "Attendance insert own" on public.attendance
  for insert with check (auth.uid() = user_id);
create policy "Attendance update own" on public.attendance
  for update using (auth.uid() = user_id);

-- ============================================================
-- Seed data (demo)
-- NOTE: user_id di bawah harus diganti dengan auth.uid() asli
--       atau disesuaikan dengan CURRENT_USER_ID di src/lib/supabase.js
-- ============================================================
do $$
declare
  demo_user uuid := 'e9b6f1c2-2a3b-4c5d-8e6f-1234567890ab';
begin
  -- profile
  insert into public.profiles (id, full_name, role, weekly_target_hours)
  values (demo_user, 'Budi Santoso', 'Senior Developer', 40)
  on conflict (id) do nothing;

  -- reports (tabel "Daftar Laporan Terkini")
  insert into public.reports (user_id, title, category, status, submitted_at) values
    (demo_user, 'Integrasi API Gateway Payment', 'Development', 'menunggu', now() - interval '2 hours'),
    (demo_user, 'Dokumentasi System Architecture', 'Technical Writing', 'diterima', now() - interval '1 day' + interval '16 hours 30 minutes'),
    (demo_user, 'Uji Coba Modul HRIS Baru', 'QA Testing', 'diterima', now() - interval '3 days'),
    (demo_user, 'Refactoring Database Migrations', 'DevOps', 'direvisi', now() - interval '4 days');

  -- tasks (untuk stat "Tugas Selesai" & pengingat)
  insert into public.tasks (user_id, title, category, is_done, due_date) values
    (demo_user, 'Integrasi API Gateway Payment', 'Development', true, current_date),
    (demo_user, 'Dokumentasi System Architecture', 'Technical Writing', true, current_date),
    (demo_user, 'Uji Coba Modul HRIS Baru', 'QA Testing', true, current_date - 1),
    (demo_user, 'Refactoring Database Migrations', 'DevOps', true, current_date - 1),
    (demo_user, 'Perbaikan Bug Login SSO', 'Development', true, current_date - 2),
    (demo_user, 'Review PR Tim Frontend', 'Development', true, current_date - 2),
    (demo_user, 'Laporan Mingguan DIV', 'Reporting', false, current_date),
    (demo_user, 'Persiapan Demo Sprint', 'Meeting', false, current_date + 1),
    (demo_user, 'Update Dokumentasi API', 'Technical Writing', false, current_date + 2),
    (demo_user, 'Audit Akses Database', 'DevOps', false, current_date + 3),
    (demo_user, 'Onboarding Anggota Baru', 'HR', false, current_date + 4),
    (demo_user, 'Optimasi Query Dashboard', 'Development', false, current_date + 5);

  -- attendance minggu ini ( Senin s.d. hari ini ) untuk "Jam Kerja"
  insert into public.attendance (user_id, clock_in, clock_out, work_date) values
    (demo_user, current_date - 4 + time '08:45', current_date - 4 + time '17:00', current_date - 4),
    (demo_user, current_date - 3 + time '08:30', current_date - 3 + time '17:15', current_date - 3),
    (demo_user, current_date - 2 + time '09:00', current_date - 2 + time '17:30', current_date - 2),
    (demo_user, current_date - 1 + time '08:50', current_date - 1 + time '16:45', current_date - 1);
end $$;
