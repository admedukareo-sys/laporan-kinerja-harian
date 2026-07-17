-- ============================================================
-- Migrasi: kolom tambahan untuk halaman Absensi & Laporan
-- Jalankan jika tabel `reports` SUDAH ada (idempoten).
-- ============================================================

-- Tambah nilai status 'ditolak' ke enum (aman jika sudah ada)
do $$
begin
  if not exists (
    select 1 from pg_enum e
    join pg_type t on t.oid = e.enumtypid
    where t.typname = 'report_status' and e.enumlabel = 'ditolak'
  ) then
    alter type report_status add value if not exists 'ditolak';
  end if;
end $$;

-- Tambah kolom baru jika belum ada
alter table public.reports add column if not exists start_time time;
alter table public.reports add column if not exists end_time time;
alter table public.reports add column if not exists duration_hours numeric(5, 2);
alter table public.reports add column if not exists attachment_url text;
