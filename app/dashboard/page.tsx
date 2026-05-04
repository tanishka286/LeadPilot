"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppNavbar } from "@/components/app-navbar";
import {
  CalendarClock,
  CheckCircle2,
  Flame,
  Handshake,
  ListTodo,
  MessageSquare,
  Phone,
  Sparkles,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { useToast } from "@/components/providers";
import { SubmitSpinner } from "@/components/submit-spinner";

type Priority = "OVERDUE" | "HOT" | "TODAY";

function formatPriorityLabel(priority: Priority): string {
  if (priority === "OVERDUE") return "Overdue";
  if (priority === "HOT") return "Hot";
  return "Today";
}

interface Action {
  leadId: string;
  name: string;
  phone: string;
  actionType: string;
  category: Priority;
  priority: string;
  followUpDate: string;
  status: string;
  label: string;
}

interface DashboardData {
  userName: string;
  actions: Action[];
  stats: {
    completedTasksToday: number;
    streak: number;
  };
}

function formatActionLabel(actionType: string): string {
  const t = actionType?.toUpperCase() ?? "";
  if (t === "CALL") return "Call";
  if (t === "MESSAGE") return "Message";
  if (t === "CLOSE") return "Close";
  return actionType;
}

function getActionIcon(actionType: string): LucideIcon {
  const t = actionType?.toUpperCase() ?? "";
  if (t === "MESSAGE") return MessageSquare;
  if (t === "CLOSE") return Handshake;
  return Phone;
}

function getPriorityStyle(category: string) {
  switch (category) {
    case "OVERDUE":
      return {
        border: "border-l-red-500",
        badgeClass:
          "bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200 border border-red-200/80 dark:border-red-800/80 font-semibold shadow-sm",
        label: "Overdue",
      };
    case "HOT":
      return {
        border: "border-l-orange-500",
        badgeClass:
          "bg-orange-50 dark:bg-orange-950/40 text-orange-900 dark:text-orange-200 border border-orange-200/80 dark:border-orange-800/80 font-semibold shadow-sm",
        label: "Hot",
      };
    case "TODAY":
      return {
        border: "border-l-yellow-500",
        badgeClass:
          "bg-yellow-50 dark:bg-yellow-950/35 text-yellow-900 dark:text-yellow-100 border border-yellow-200/80 dark:border-yellow-800/80 font-semibold shadow-sm",
        label: "Today",
      };
    default:
      return {
        border: "border-l-gray-300 dark:border-l-gray-500",
        badgeClass:
          "bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600",
        label: category,
      };
  }
}

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Add leads",
    line: "Enter lead details",
    body: "Name, phone, and status in one form.",
    icon: UserPlus,
  },
  {
    step: 2,
    title: "Set follow-up date",
    line: "Choose next contact date",
    body: "It shows on your dashboard when due.",
    icon: CalendarClock,
  },
  {
    step: 3,
    title: "See today’s list",
    line: "See what to do today",
    body: "Who to call, message, or close—by priority.",
    icon: ListTodo,
  },
  {
    step: 4,
    title: "Complete tasks",
    line: "Mark follow-up finished",
    body: "Then set the next date if you need one.",
    icon: CheckCircle2,
  },
  {
    step: 5,
    title: "Build streak",
    line: "Complete tasks and build streak",
    body: "Finish at least one task on days you use the app.",
    icon: Flame,
  },
] as const;

export default function DashboardPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchDashboard = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error();
      }

      const json = await res.json();
      setData(json);
    } catch {
      console.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleCompleteTask = async (followUpOption: string) => {
    if (!selectedLead) return;
    setActionLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    let followUpDate: string | undefined = undefined;
    const now = new Date();

    if (followUpOption === "Tomorrow") {
      now.setDate(now.getDate() + 1);
      followUpDate = now.toISOString();
    } else if (followUpOption === "3 Days") {
      now.setDate(now.getDate() + 3);
      followUpDate = now.toISOString();
    } else if (followUpOption === "Next Week") {
      now.setDate(now.getDate() + 7);
      followUpDate = now.toISOString();
    } else if (followUpOption === "Custom Date") {
      const custom = window.prompt("Enter next follow-up date (YYYY-MM-DD):");
      if (!custom) {
        setActionLoading(false);
        return;
      }
      followUpDate = new Date(custom).toISOString();
    }

    try {
      const res = await fetch(`/api/actions/${selectedLead}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ followUpDate }),
      });

      if (res.ok) {
        showToast("Task completed");
        setSelectedLead(null);
        fetchDashboard();
      } else {
        alert("Failed to complete action task");
      }
    } catch (e) {
      alert("Error completing action task");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-gray-100/90 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex flex-col font-sans text-gray-900 dark:text-white">
        <AppNavbar active="dashboard" onLogout={handleLogout} />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-slate-50 via-white to-primary-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-primary-900/30 p-8 sm:p-10 shadow-sm transition-all duration-200 ease-in-out mb-8 sm:mb-10">
            <div className="space-y-3 relative">
              <div className="h-9 sm:h-12 w-72 max-w-full rounded-xl bg-gray-200/90 dark:bg-gray-600/90 animate-pulse" />
              <div className="h-5 w-full max-w-md rounded-lg bg-gray-200/70 dark:bg-gray-600/70 animate-pulse" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-10 sm:mb-12">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-primary-50/30 dark:from-gray-800 dark:to-primary-900/20 p-8 shadow-sm min-h-[160px] animate-pulse">
              <div className="h-4 w-44 rounded bg-gray-200/80 dark:bg-gray-600/80 mb-4" />
              <div className="h-14 w-20 rounded-lg bg-gray-200/70 dark:bg-gray-600/70" />
            </div>
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white to-primary-50/30 dark:from-gray-800 dark:to-primary-900/20 p-8 shadow-sm min-h-[160px] animate-pulse">
              <div className="h-4 w-36 rounded bg-gray-200/80 dark:bg-gray-600/80 mb-4" />
              <div className="h-14 w-24 rounded-lg bg-gray-200/70 dark:bg-gray-600/70" />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 w-48 rounded-lg bg-gray-200/80 dark:bg-gray-600/80 animate-pulse" />
            <div className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600 border-t-gray-800 dark:border-t-gray-200 animate-spin shrink-0 ml-auto" aria-hidden />
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm min-h-[11rem] animate-pulse border-l-4 border-l-gray-200 dark:border-l-gray-600 transition-all duration-200 ease-in-out"
              >
                <div className="h-7 w-48 rounded-lg bg-gray-100 dark:bg-gray-700 mb-5" />
                <div className="h-4 w-full max-w-md rounded bg-gray-100 dark:bg-gray-700 mb-3" />
                <div className="h-4 w-32 rounded bg-gray-100 dark:bg-gray-700 mb-6" />
                <div className="h-12 w-full max-w-xs rounded-xl bg-gray-100 dark:bg-gray-700 ml-auto" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-gray-50 to-gray-100/90 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 flex flex-col font-sans text-gray-900 dark:text-white">
      <AppNavbar active="dashboard" onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
        {data && (
          <>
            <header className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-slate-50 via-white to-primary-50/60 dark:from-gray-800 dark:via-gray-800 dark:to-primary-900/40 p-8 sm:p-10 shadow-sm mb-8 sm:mb-10 ring-1 ring-gray-900/[0.04] dark:ring-white/[0.06] transition-all duration-200 ease-in-out hover:shadow-lg">
              <div
                className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary-200/35 via-primary-100/20 to-transparent blur-2xl"
                aria-hidden
              />
              <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="min-w-0 space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/70 dark:bg-gray-900/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300 ring-1 ring-primary-200/60 dark:ring-primary-700/50 shadow-sm backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    Today
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Good morning, {data.userName}
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed mt-1">
                    Here&apos;s what you need to do today
                  </p>
                </div>
              </div>
            </header>

            <div className="grid sm:grid-cols-2 gap-5 mb-10 sm:mb-12">
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-white to-primary-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-primary-900/30 p-8 sm:p-9 shadow-sm ring-1 ring-gray-900/[0.04] dark:ring-white/[0.06] transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_0%,rgba(59,130,246,0.12),transparent_55%)]"
                  aria-hidden
                />
                <div className="relative space-y-2">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-tight">
                    Tasks completed today
                  </p>
                  <p className="text-5xl sm:text-6xl font-bold tabular-nums leading-none tracking-tight text-primary-600 dark:text-primary-400">
                    {data.stats.completedTasksToday}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pt-1">
                    {data.stats.completedTasksToday === 1 ? "task" : "tasks"} marked done since midnight.
                  </p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-white via-white to-primary-50/40 dark:from-gray-800 dark:via-gray-800 dark:to-primary-900/25 p-8 sm:p-9 shadow-sm ring-1 ring-gray-900/[0.04] dark:ring-white/[0.06] transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_100%_0%,rgba(59,130,246,0.1),transparent_55%)]"
                  aria-hidden
                />
                <div className="relative space-y-2">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 tracking-tight flex items-center gap-2">
                    Current streak{" "}
                    <span className="text-lg leading-none" aria-hidden>
                      🔥
                    </span>
                  </p>
                  <p className="text-5xl sm:text-6xl font-bold tabular-nums leading-none tracking-tight text-primary-600 dark:text-primary-400 flex items-baseline gap-2 flex-wrap">
                    <span>{data.stats.streak}</span>
                    <span className="text-xl sm:text-2xl font-semibold text-gray-500 dark:text-gray-400">
                      {data.stats.streak === 1 ? "day" : "days"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 pt-1">
                    Complete at least one task on days you use the app.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-12 sm:mb-14">
              <div className="flex items-end justify-between gap-4 mb-7">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                  Today&apos;s actions
                </h2>
                {data.actions.length > 0 && (
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 tabular-nums shrink-0 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1">
                    {data.actions.length} due
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {data.actions.length === 0 ? (
                  <div className="relative overflow-hidden rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 bg-gradient-to-b from-white to-gray-50/80 dark:from-gray-800 dark:to-gray-800/90 px-8 py-20 text-center shadow-sm transition-all duration-200 ease-in-out">
                    <div
                      className="pointer-events-none absolute inset-x-0 -top-px h-24 bg-gradient-to-b from-primary-100/30 to-transparent"
                      aria-hidden
                    />
                    <p className="relative text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                      You&apos;re all caught up today 🎉
                    </p>
                    <p className="relative mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      New items appear here when a follow-up is due.
                    </p>
                  </div>
                ) : (
                  data.actions.map((action) => {
                    const priority = getPriorityStyle(action.category);
                    const actionLabel = formatActionLabel(action.actionType);
                    const ActionIcon = getActionIcon(action.actionType);
                    return (
                      <article
                        key={action.leadId}
                        className={`group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm border-l-[5px] transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 ${priority.border}`}
                      >
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-gray-50/40 dark:from-gray-800 dark:to-gray-800/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        <div className="relative flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-6 lg:gap-10">
                          <div className="min-w-0 flex-1 space-y-5">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight break-words">
                                {action.name}
                              </h3>
                              <span
                                className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide shrink-0 ${priority.badgeClass}`}
                              >
                                {formatPriorityLabel(action.category)}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4">
                              <div className="flex min-w-0 items-center gap-3 rounded-xl bg-gray-50/90 dark:bg-gray-900/50 px-4 py-3 ring-1 ring-gray-200/60 dark:ring-gray-600/60">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm ring-1 ring-gray-200/80 dark:ring-gray-600/80">
                                  <ActionIcon className="h-5 w-5" aria-hidden />
                                </span>
                                <div>
                                  <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    Action
                                  </p>
                                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                                    {actionLabel}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm tabular-nums text-gray-500 dark:text-gray-400 sm:ml-1">
                                {action.phone}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-end lg:items-center shrink-0">
                            <button
                              type="button"
                              disabled={selectedLead !== null || actionLoading}
                              onClick={() => setSelectedLead(action.leadId)}
                              className="w-full lg:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 font-semibold py-3.5 px-8 min-h-[3rem] shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-white/20 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 transition-all duration-200 ease-in-out enabled:hover:scale-[1.02] enabled:active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              {actionLoading && selectedLead === action.leadId ? (
                                <>
                                  <SubmitSpinner className="border-white/40 border-t-white dark:border-gray-300/50 dark:border-t-black" />
                                  Loading...
                                </>
                              ) : (
                                <>
                                  Mark as Done
                                  <CheckCircle2 className="h-4 w-4 opacity-90" />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
            </section>

            <section className="pb-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white tracking-tight mb-2">
                How LeadPilot works
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                Add leads, set follow-ups, work the today list, and keep a streak when you stay consistent.
              </p>

              <div className="relative">
                <div
                  className="hidden md:block absolute left-[1.375rem] top-10 bottom-10 w-px bg-gradient-to-b from-gray-200 via-primary-200 to-gray-200 dark:from-gray-600 dark:via-primary-800 dark:to-gray-600"
                  aria-hidden
                />
                <ul className="space-y-7 md:space-y-9">
                  {HOW_IT_WORKS_STEPS.map(({ step, title, line, body, icon: Icon }) => (
                    <li key={step}>
                      <div className="flex gap-4 md:gap-6">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-base font-bold text-gray-900 dark:text-white shadow-sm z-[1]">
                            {step}
                          </div>
                        </div>
                        <div className="flex-1 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5 min-w-0 min-h-[8.25rem]">
                          <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-gray-50 dark:bg-gray-700/80 p-2 text-gray-700 dark:text-gray-200">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white text-lg tracking-tight">
                                {title}
                              </h3>
                              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-0.5">
                                {line}
                              </p>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                {body}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </main>

      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="followup-modal-title"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 ease-in-out">
            <div className="px-6 pt-6 pb-2">
              <h3
                id="followup-modal-title"
                className="text-xl font-semibold text-gray-900 dark:text-white text-center tracking-tight"
              >
                Set next follow-up
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-2">
                When should we remind you about this lead?
              </p>
            </div>
            <div className="p-6 pt-4 space-y-2.5">
              {["Tomorrow", "3 Days", "Next Week", "Custom Date"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleCompleteTask(opt)}
                  className="w-full cursor-pointer rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 py-3.5 px-4 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20 dark:focus-visible:ring-white/10 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out hover:scale-[1.01] inline-flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <SubmitSpinner className="border-gray-300 border-t-gray-800 dark:border-gray-500 dark:border-t-gray-200" />
                      Loading...
                    </>
                  ) : (
                    opt
                  )}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700 mt-4">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleCompleteTask("No Follow-up")}
                  className="w-full cursor-pointer py-3 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <SubmitSpinner className="border-gray-300 border-t-gray-600 dark:border-gray-500 dark:border-t-gray-300" />
                      Loading...
                    </>
                  ) : (
                    "No follow-up"
                  )}
                </button>
              </div>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => setSelectedLead(null)}
                className="w-full cursor-pointer py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
