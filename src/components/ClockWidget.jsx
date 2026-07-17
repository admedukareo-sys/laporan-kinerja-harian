import { useEffect, useState } from "react";

export default function ClockWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeString = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const dateString = now.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="col-span-12 lg:col-span-4 bg-primary text-white p-lg rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline-sm text-headline-sm opacity-80">
              Absensi Cepat
            </h3>
            <p className="text-display-lg font-display-lg mt-xs">{timeString}</p>
            <p className="text-body-md opacity-70">{dateString}</p>
          </div>
          <span className="material-symbols-outlined text-[40px] opacity-20">
            schedule
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-xl flex gap-md">
        <button className="flex-1 bg-white text-primary py-md rounded-xl font-bold hover:bg-primary-fixed transition-all active:scale-95">
          Clock In
        </button>
        <button className="flex-1 bg-white/10 border border-white/30 text-white py-md rounded-xl font-bold hover:bg-white/20 transition-all active:scale-95">
          Clock Out
        </button>
      </div>

      <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -left-12 -top-12 w-32 h-32 bg-primary-container rounded-full blur-2xl"></div>
    </div>
  );
}
