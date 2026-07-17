import Icon from "./Icon";

function StatCard({ label, icon, iconClass, iconBg, children }) {
  return (
    <div className="bg-white p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-md">
          <span className="text-outline font-label-md uppercase tracking-tight">
            {label}
          </span>
          <span
            className={`material-symbols-outlined ${iconClass} ${iconBg} p-xs rounded-lg`}
          >
            {icon}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function StatCards() {
  return (
    <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-lg">
      <StatCard
        label="Jam Kerja"
        icon="laps"
        iconClass="text-primary"
        iconBg="bg-primary-fixed/30"
      >
        <p className="font-headline-md text-headline-md text-on-surface">
          40 <span className="text-body-md font-normal text-outline">jam/minggu</span>
        </p>
        <div className="mt-lg">
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[80%] rounded-full"></div>
          </div>
          <p className="text-[11px] mt-xs text-outline">
            Target: 40 jam (80% tercapai)
          </p>
        </div>
      </StatCard>

      <StatCard
        label="Tugas Selesai"
        icon="task_alt"
        iconClass="text-secondary"
        iconBg="bg-secondary-container/30"
      >
        <p className="font-headline-md text-headline-md text-on-surface">85%</p>
        <div className="mt-lg flex items-center gap-xs text-on-secondary-container bg-secondary-container/20 px-sm py-xs rounded w-fit">
          <Icon name="trending_up" className="text-[14px]" />
          <span className="text-[11px] font-bold">+5% vs bulan lalu</span>
        </div>
      </StatCard>

      <StatCard
        label="Pengingat Laporan"
        icon="notification_important"
        iconClass="text-error"
        iconBg="bg-error-container/30"
      >
        <p className="font-headline-md text-headline-md text-on-surface">
          3 <span className="text-body-md font-normal text-outline">belum submit</span>
        </p>
        <div className="mt-lg">
          <button className="text-primary font-label-md flex items-center gap-xs hover:underline">
            Lihat Semua <Icon name="chevron_right" className="text-[16px]" />
          </button>
        </div>
      </StatCard>
    </div>
  );
}
