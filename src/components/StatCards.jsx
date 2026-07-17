import Icon from "./Icon";

export default function StatCards({ summary }) {
  const {
    workHours,
    workHoursTarget,
    workHoursPct,
    tasksPct,
    tasksDone,
    tasksTotal,
    pendingReports,
  } = summary;

  return (
    <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-lg">
      <div className="bg-white p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-md">
            <span className="text-outline font-label-md uppercase tracking-tight">
              Jam Kerja
            </span>
            <span className="material-symbols-outlined text-primary bg-primary-fixed/30 p-xs rounded-lg">
              laps
            </span>
          </div>
          <p className="font-headline-md text-headline-md text-on-surface">
            {workHours}{" "}
            <span className="text-body-md font-normal text-outline">jam/minggu</span>
          </p>
        </div>
        <div className="mt-lg">
          <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{ width: `${workHoursPct}%` }}
            ></div>
          </div>
          <p className="text-[11px] mt-xs text-outline">
            Target: {workHoursTarget} jam ({workHoursPct}% tercapai)
          </p>
        </div>
      </div>

      <div className="bg-white p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-md">
            <span className="text-outline font-label-md uppercase tracking-tight">
              Tugas Selesai
            </span>
            <span className="material-symbols-outlined text-secondary bg-secondary-container/30 p-xs rounded-lg">
              task_alt
            </span>
          </div>
          <p className="font-headline-md text-headline-md text-on-surface">
            {tasksPct}%
          </p>
        </div>
        <div className="mt-lg flex items-center gap-xs text-on-secondary-container bg-secondary-container/20 px-sm py-xs rounded w-fit">
          <Icon name="trending_up" className="text-[14px]" />
          <span className="text-[11px] font-bold">
            {tasksDone}/{tasksTotal} tugas
          </span>
        </div>
      </div>

      <div className="bg-white p-lg rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-md">
            <span className="text-outline font-label-md uppercase tracking-tight">
              Pengingat Laporan
            </span>
            <span className="material-symbols-outlined text-error bg-error-container/30 p-xs rounded-lg">
              notification_important
            </span>
          </div>
          <p className="font-headline-md text-headline-md text-on-surface">
            {pendingReports}{" "}
            <span className="text-body-md font-normal text-outline">belum submit</span>
          </p>
        </div>
        <div className="mt-lg">
          <button className="text-primary font-label-md flex items-center gap-xs hover:underline">
            Lihat Semua <Icon name="chevron_right" className="text-[16px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
