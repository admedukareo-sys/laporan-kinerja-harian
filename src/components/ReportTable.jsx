import Icon from "./Icon";

export default function ReportTable({ reports }) {
  return (
    <div className="col-span-12 bg-white rounded-xl border border-outline-variant shadow-sm overflow-hidden">
      <div className="p-lg border-b border-outline-variant flex justify-between items-center">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">
          Daftar Laporan Terkini
        </h3>
        <div className="flex gap-sm">
          <button className="px-md py-xs border border-outline-variant rounded-lg text-label-md text-on-surface-variant hover:bg-surface-container-low transition-all">
            Filter
          </button>
          <button className="px-md py-xs border border-outline-variant rounded-lg text-label-md text-on-surface-variant hover:bg-surface-container-low transition-all">
            Ekspor PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              {["Judul Tugas", "Kategori", "Waktu Submit", "Status", "Aksi"].map((h) => (
                <th
                  key={h}
                  className="p-lg font-label-md text-outline uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {reports.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="p-lg text-center font-body-md text-outline"
                >
                  Belum ada laporan.
                </td>
              </tr>
            )}
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-primary-fixed/5 transition-colors">
                <td className="p-lg font-body-md text-on-surface font-semibold">
                  {r.title}
                </td>
                <td className="p-lg font-body-md text-on-surface-variant">
                  {r.category}
                </td>
                <td className="p-lg font-body-md text-on-surface-variant">{r.time}</td>
                <td className="p-lg">
                  <span
                    className={`${r.badge} px-sm py-xs rounded-full text-[11px] font-bold uppercase tracking-wide`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="p-lg">
                  <button className="text-primary hover:text-primary-container">
                    <Icon name="visibility" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-md bg-surface-container-lowest border-t border-outline-variant flex justify-center">
        <button className="text-primary font-label-md flex items-center gap-xs hover:underline">
          Lihat Semua Riwayat Laporan <Icon name="expand_more" className="text-[16px]" />
        </button>
      </div>
    </div>
  );
}
