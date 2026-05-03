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

interface Action {
  leadId: string;
  name: string;
  phone: string;
  actionType: string;
  category: string;
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
          "bg-red-50 text-red-800 border-red-200 ring-2 ring-red-100/80 font-bold",
        label: "Overdue",
        emoji: "🔴",
      };
    case "HOT":
      return {
        border: "border-l-orange-500",
        badgeClass:
          "bg-orange-50 text-orange-900 border-orange-200 ring-2 ring-orange-100/80 font-bold",
        label: "Hot",
        emoji: "🔥",
      };
    case "TODAY":
      return {
        border: "border-l-yellow-500",
        badgeClass:
          "bg-yellow-50 text-yellow-900 border-yellow-200 ring-2 ring-yellow-100/80 font-bold",
        label: "Today",
        emoji: "🟡",
      };
    default:
      return {
        border: "border-l-gray-300",
        badgeClass: "bg-gray-50 text-gray-800 border-gray-200",
        label: category,
        emoji: "",
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80 flex flex-col font-sans text-gray-900">
        <AppNavbar active="dashboard" onLogout={handleLogout} />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
          <div className="mb-8 sm:mb-10 space-y-3">
            <div className="h-9 sm:h-11 w-64 max-w-full rounded-lg bg-gray-200/80 animate-pulse" />
            <div className="h-5 w-full max-w-xl rounded bg-gray-200/70 animate-pulse" />
          </div>
          <div className="rounded-2xl border border-gray-200 bg-gray-100/90 p-6 sm:p-10 shadow-soft min-h-[220px] sm:min-h-[200px] mb-10 sm:mb-12">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
              <div className="space-y-3">
                <div className="h-4 w-40 rounded bg-gray-200/80 animate-pulse" />
                <div className="h-10 w-24 rounded bg-gray-200/70 animate-pulse" />
                <div className="h-4 w-full max-w-xs rounded bg-gray-200/60 animate-pulse" />
              </div>
              <div className="space-y-3 sm:border-l sm:border-gray-200 sm:pl-10">
                <div className="h-4 w-24 rounded bg-gray-200/80 animate-pulse" />
                <div className="h-10 w-20 rounded bg-gray-200/70 animate-pulse" />
                <div className="h-4 w-full max-w-xs rounded bg-gray-200/60 animate-pulse" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-7 w-48 rounded bg-gray-200/80 animate-pulse" />
            <div className="h-10 w-10 rounded-full border-2 border-gray-200 border-t-gray-800 animate-spin shrink-0 ml-auto" aria-hidden />
          </div>
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-soft min-h-[9.5rem] animate-pulse"
              >
                <div className="h-5 w-40 rounded bg-gray-100 mb-4" />
                <div className="h-4 w-full max-w-md rounded bg-gray-100 mb-2" />
                <div className="h-4 w-32 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80 flex flex-col font-sans text-gray-900">
      <AppNavbar active="dashboard" onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        {data && (
          <>
            <div className="mb-8 sm:mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                Good morning, {data.userName}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-gray-600 font-medium">
                Your list for today—calls, messages, and follow-ups in one place.
              </p>
            </div>

            <div className="mb-10 sm:mb-12">
              <div className="rounded-2xl border border-gray-200 bg-gray-100/90 p-6 sm:p-10 shadow-soft ring-1 ring-gray-900/5 min-h-[220px] sm:min-h-[200px]">
                <div className="flex items-start gap-3 mb-8">
                  <div className="rounded-xl bg-primary-50 p-2.5 text-primary-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Today at a glance
                    </p>
                    <p className="text-sm text-gray-600 mt-0.5">
                      Tasks you finished today and your current streak
                    </p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-600">Tasks completed today</p>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums leading-none">
                      <span className="text-primary-600">{data.stats.completedTasksToday}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {data.stats.completedTasksToday === 1 ? "task" : "tasks"} marked done since midnight.
                    </p>
                  </div>
                  <div className="sm:border-l sm:border-gray-200 sm:pl-10 space-y-3">
                    <p className="text-sm font-medium text-gray-600">Streak</p>
                    <p className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums leading-none flex items-baseline gap-2">
                      <span>{data.stats.streak}</span>
                      <span className="text-lg sm:text-xl font-semibold text-gray-600">
                        {data.stats.streak === 1 ? "day" : "days"}
                      </span>
                      <span className="text-4xl sm:text-5xl leading-none" aria-hidden>
                        🔥
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Complete at least one task on days you use the app.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="mb-12 sm:mb-14">
              <div className="flex items-end justify-between gap-4 mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  Today&apos;s actions
                </h2>
                {data.actions.length > 0 && (
                  <span className="text-sm font-semibold text-gray-500 tabular-nums shrink-0">
                    {data.actions.length} due
                  </span>
                )}
              </div>

              <div className="space-y-5">
                {data.actions.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 px-8 py-16 text-center shadow-soft">
                    <p className="text-lg sm:text-xl font-semibold text-gray-800">
                      You&apos;re all caught up today
                    </p>
                    <p className="mt-2 text-gray-600 max-w-md mx-auto">
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
                        className={`group rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6 shadow-soft hover:shadow-soft-lg transition-shadow border-l-4 min-h-[9.5rem] ${priority.border}`}
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                          <div className="space-y-3 min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {action.name}
                              </h3>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs border shrink-0 ${priority.badgeClass}`}
                              >
                                <span aria-hidden>{priority.emoji}</span>
                                {priority.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-600">
                              <span className="inline-flex items-center gap-1.5 text-gray-700">
                                <ActionIcon className="h-4 w-4 text-gray-400 shrink-0" />
                                <span className="text-gray-500 font-medium text-xs uppercase tracking-wide">
                                  Action
                                </span>
                                <span className="text-sm font-medium">{actionLabel}</span>
                              </span>
                              <span className="text-gray-300 hidden sm:inline">
                                ·
                              </span>
                              <span className="text-sm font-medium tabular-nums text-gray-600">
                                {action.phone}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            disabled={selectedLead !== null || actionLoading}
                            onClick={() => setSelectedLead(action.leadId)}
                            className="shrink-0 w-full lg:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-black text-white font-semibold py-3 px-6 shadow-md hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {actionLoading && selectedLead === action.leadId ? (
                              <>
                                <SubmitSpinner className="border-white/40 border-t-white" />
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
                      </article>
                    );
                  })
                )}
              </div>
            </section>

            <section className="pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-2">
                How LeadPilot works
              </h2>
              <p className="text-gray-600 mb-8 max-w-2xl">
                Add leads, set follow-ups, work the today list, and keep a streak when you stay consistent.
              </p>

              <div className="relative">
                <div
                  className="hidden md:block absolute left-[1.375rem] top-10 bottom-10 w-px bg-gradient-to-b from-gray-200 via-primary-200 to-gray-200"
                  aria-hidden
                />
                <ul className="space-y-7 md:space-y-9">
                  {HOW_IT_WORKS_STEPS.map(({ step, title, line, body, icon: Icon }) => (
                    <li key={step}>
                      <div className="flex gap-4 md:gap-6">
                        <div className="flex flex-col items-center shrink-0">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white border-2 border-gray-200 text-base font-bold text-gray-900 shadow-sm z-[1]">
                            {step}
                          </div>
                        </div>
                        <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-5 shadow-soft hover:shadow-soft-lg transition-shadow min-w-0 min-h-[8.25rem]">
                          <div className="flex items-start gap-3">
                            <div className="rounded-xl bg-gray-50 p-2 text-gray-700">
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {title}
                              </h3>
                              <p className="text-sm font-semibold text-gray-700 mt-0.5">
                                {line}
                              </p>
                              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
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
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 ring-1 ring-black/5 overflow-hidden">
            <div className="px-6 pt-6 pb-2">
              <h3
                id="followup-modal-title"
                className="text-xl font-bold text-gray-900 text-center tracking-tight"
              >
                Set next follow-up
              </h3>
              <p className="text-sm text-gray-500 text-center mt-2">
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
                  className="w-full cursor-pointer rounded-xl border border-gray-200 bg-white py-3.5 px-4 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <SubmitSpinner className="border-gray-300 border-t-gray-800" />
                      Loading...
                    </>
                  ) : (
                    opt
                  )}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={() => handleCompleteTask("No Follow-up")}
                  className="w-full cursor-pointer py-3 text-sm font-semibold text-gray-500 hover:text-gray-800 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {actionLoading ? (
                    <>
                      <SubmitSpinner className="border-gray-300 border-t-gray-600" />
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
                className="w-full cursor-pointer py-3 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
