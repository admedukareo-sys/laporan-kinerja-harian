import { useEffect, useState } from "react";
import { supabase, CURRENT_USER_ID } from "../lib/supabase";

const STATUS_LABEL = {
  menunggu: "Menunggu",
  diterima: "Diterima",
  direvisi: "Direvisi",
  draft: "Draft",
};

const STATUS_BADGE = {
  menunggu: "bg-[#FEF3C7] text-[#92400E]",
  diterima: "bg-[#D1FAE5] text-[#065F46]",
  direvisi: "bg-[#DBEAFE] text-[#1E40AF]",
  draft: "bg-[#E5E7EB] text-[#374151]",
};

function startOfWeek(date = new Date()) {
  const d = new Date(date);
  const day = (d.getDay() + 6) % 7; // Senin = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
}

function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 3600) return `${Math.max(1, Math.floor(diff / 60))} menit yang lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
  const days = Math.floor(diff / 86400);
  if (days === 1) return "Kemarin";
  return `${days} hari lalu`;
}

function formatSubmit(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 86400) return timeAgo(iso);
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function useDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [summary, setSummary] = useState({
    workHours: 0,
    workHoursTarget: 40,
    tasksDone: 0,
    tasksTotal: 0,
    pendingReports: 0,
    reportsThisWeek: 0,
  });
  const [reports, setReports] = useState([]);
  const [achievements, setAchievements] = useState({
    tasksCompleted: 0,
    deptAverage: 0,
  });

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const weekStart = startOfWeek().toISOString();

        const [{ data: profile }, { data: reports }, { data: tasks }, { data: attendance }] =
          await Promise.all([
            supabase
              .from("profiles")
              .select("*")
              .eq("id", CURRENT_USER_ID)
              .maybeSingle(),
            supabase
              .from("reports")
              .select("*")
              .eq("user_id", CURRENT_USER_ID)
              .order("submitted_at", { ascending: false })
              .limit(10),
            supabase.from("tasks").select("*").eq("user_id", CURRENT_USER_ID),
            supabase
              .from("attendance")
              .select("*")
              .eq("user_id", CURRENT_USER_ID)
              .gte("work_date", weekStart.slice(0, 10)),
          ]);

        if (!active) return;

        const target = profile?.weekly_target_hours ?? 40;
        let workHours = 0;
        (attendance || []).forEach((a) => {
          if (a.clock_in && a.clock_out) {
            workHours +=
              (new Date(a.clock_out) - new Date(a.clock_in)) / 3600000;
          }
        });
        workHours = Math.round(workHours);

        const tasksTotal = tasks?.length ?? 0;
        const tasksDone = tasks?.filter((t) => t.is_done).length ?? 0;
        const pending = reports?.filter((r) => r.status === "menunggu").length ?? 0;
        const reportsThisWeek =
          reports?.filter((r) => new Date(r.submitted_at) >= startOfWeek()).length ?? 0;

        setProfile(profile);
        setReports(
          (reports || []).map((r) => ({
            id: r.id,
            title: r.title,
            category: r.category,
            time: formatSubmit(r.submitted_at),
            status: STATUS_LABEL[r.status] ?? r.status,
            badge: STATUS_BADGE[r.status] ?? STATUS_BADGE.draft,
          }))
        );
        setSummary({
          workHours,
          workHoursTarget: target,
          workHoursPct: Math.min(100, Math.round((workHours / target) * 100)),
          tasksDone,
          tasksTotal,
          tasksPct: tasksTotal ? Math.round((tasksDone / tasksTotal) * 100) : 0,
          pendingReports: pending,
          reportsThisWeek,
        });
        setAchievements({
          tasksCompleted: tasksDone,
          deptAverage: Math.round(tasksTotal * 0.7),
        });
      } catch (e) {
        if (active) setError(e.message || "Gagal memuat data");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return { loading, error, profile, summary, reports, achievements };
}
