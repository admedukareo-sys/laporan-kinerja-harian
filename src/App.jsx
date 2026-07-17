import { useEffect } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import StatCards from "./components/StatCards";
import ClockWidget from "./components/ClockWidget";
import ReportTable from "./components/ReportTable";
import Spotlight from "./components/Spotlight";
import Icon from "./components/Icon";

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

  return (
    <div class="bg-background text-on-background font-body-md min-h-screen overflow-x-hidden">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <TopBar />

        <div className="pt-24 px-xl pb-xl max-w-[1440px] mx-auto">
          <header className="mb-xl flex justify-between items-end">
            <div>
              <h2 className="font-display-lg text-display-lg text-primary">
                Selamat Pagi, Budi!
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

          <div className="grid grid-cols-12 gap-lg">
            <StatCards />
            <ClockWidget />
            <ReportTable />
            <Spotlight />
          </div>
        </div>
      </main>
    </div>
  );
}
