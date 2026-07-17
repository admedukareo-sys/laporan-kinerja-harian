import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import StatCards from "./components/StatCards";
import ClockWidget from "./components/ClockWidget";
import ReportTable from "./components/ReportTable";
import Spotlight from "./components/Spotlight";
import Icon from "./components/Icon";
import { useDashboard } from "./hooks/useDashboard";

function usePressInteraction() {
  useEffect(() => {
    const buttons = document.querySelectorAll("button");
    const add = (e) => e.currentTarget.classList.add("scale-95");
    const remove = (e) => e.currentTarget.classList.remove("scale-95");
    buttons.forEach((b) => {
      b.addEventListener("mousedown", add);
      b.addEventListener("mouseup", remove);
      b.addEventListener("mouseleave", remove);
    });
    return () => {
      buttons.forEach((b) => {
        b.removeEventListener("mousedown", add);
        b.removeEventListener("mouseup", remove);
        b.removeEventListener("mouseleave", remove);
      });
    };
  }, []);
}

export default function App() {
  usePressInteraction();
  const { loading, error, profile, summary, reports, achievements } = useDashboard();

  const displayName = profile?.full_name?.split(" ")[0] ?? "Pengguna";
  const fullName = profile?.full_name ?? "Pengguna";
  const role = profile?.role ?? "Pegawai";

  return (
    <div class="bg-background text-on-background font-body-md min-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <TopBar fullName={fullName} role={role} avatarUrl={profile?.avatar_url} />

        <div className="pt-24 px-xl pb-xl max-w-[1440px] mx-auto">
          <header className="mb-xl flex justify-between items-end">
            <div>
              <h2 className="font-display-lg text-display-lg text-primary">
                Selamat Pagi, {displayName}!
              </h2>
              <p className="font-body-lg text-on-surface-variant mt-xs">
                Berikut adalah ringkasan performa dan tugas Anda hari ini.
              </p>
            </div>
            <button className="bg-primary text-white px-lg py-md rounded-xl font-bold flex items-center gap-sm hover:bg-primary-container transition-all active:scale-95 shadow-md">
              <Icon name="add_circle" />
              <span>Buat Laporan Baru</span>
            </button>
          </header>

          {error && (
            <div className="mb-lg bg-error-container text-on-error-container border border-error/30 rounded-xl p-md font-body-md">
              Gagal memuat data: {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-12 gap-lg">
              <div className="col-span-12 bg-white rounded-xl border border-outline-variant p-xl text-center text-outline font-body-md">
                Memuat data dari Supabase…
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-lg">
              <StatCards summary={summary} />
              <ClockWidget />
              <ReportTable reports={reports} />
              <Spotlight achievements={achievements} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
