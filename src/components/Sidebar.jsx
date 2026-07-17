import Icon from "./Icon";

const navItems = [
  { label: "Dashboard", icon: "dashboard", active: true },
  { label: "Absensi", icon: "schedule", active: false },
  { label: "Laporan", icon: "edit_note", active: false },
  { label: "Riwayat", icon: "history", active: false },
  { label: "Tim Saya", icon: "group", active: false },
  { label: "Manajemen", icon: "settings", active: false },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col bg-surface-container-lowest border-r border-outline-variant w-64 z-20">
      <div className="p-lg flex flex-col gap-sm">
        <div className="flex items-center gap-sm">
          <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center text-white">
            <Icon name="deployed_code" filled />
          </div>
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-primary">
              KinerjaKu
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-outline">
              Enterprise Performance
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-md mt-lg space-y-base">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={
              "flex items-center gap-md px-md py-sm rounded-lg transition-colors duration-200 " +
              (item.active
                ? "text-primary font-bold border-r-4 border-primary bg-surface-container-low"
                : "text-on-surface-variant hover:bg-surface-container")
            }
          >
            <Icon name={item.icon} />
            <span className="font-body-md">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="p-lg">
        <button className="w-full bg-primary text-white py-md px-lg rounded-xl font-bold flex items-center justify-center gap-sm active:scale-95 transition-all shadow-lg shadow-primary/20">
          <Icon name="timer" />
          <span>Clock In Now</span>
        </button>
      </div>
    </aside>
  );
}
