import Icon from "./Icon";

export default function Spotlight({ achievements }) {
  const aboveTarget = achievements.tasksCompleted > achievements.deptAverage;
  return (
    <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-lg">
      <div className="bg-surface-container rounded-xl p-lg flex items-center gap-lg border border-outline-variant">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Icon name="emoji_events" className="text-primary text-[32px]" />
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface">
            Pencapaian Minggu Ini
          </h4>
          <p className="text-body-md text-on-surface-variant">
            Anda menyelesaikan {achievements.tasksCompleted} tugas,{" "}
            {aboveTarget ? "melampaui" : "mencapai"} target rata-rata departemen (
            {achievements.deptAverage}).
          </p>
        </div>
      </div>

      <div className="bg-surface-container rounded-xl p-lg flex items-center gap-lg border border-outline-variant">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
          <Icon name="lightbulb" className="text-secondary text-[32px]" />
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm text-on-surface">
            Tips Performa
          </h4>
          <p className="text-body-md text-on-surface-variant">
            Gunakan fitur "Auto-Draft" untuk memudahkan pembuatan laporan harian
            Anda.
          </p>
        </div>
      </div>
    </div>
  );
}
