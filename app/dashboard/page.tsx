"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function DashboardPage() {
  const router = useRouter();
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
        headers: { Authorization: `Bearer ${token}` }
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

  const getPriorityColors = (category: string) => {
    switch(category) {
      case 'OVERDUE': return 'bg-red-100 text-red-800 border-red-200';
      case 'HOT': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'TODAY': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-extrabold text-black">LeadPilot</span>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="border-black text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold">
                  Dashboard
                </Link>
                <Link href="/leads" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors">
                  Leads
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="sm:hidden flex space-x-4 mr-4">
                <Link href="/dashboard" className="text-gray-900 text-sm font-bold">Dashboard</Link>
                <Link href="/leads" className="text-gray-500 text-sm font-bold">Leads</Link>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors border-2 border-gray-200 bg-white hover:bg-gray-50 rounded-xl px-5 py-2.5"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {data && (
          <>
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Good morning, {data.userName}</h1>
              <p className="mt-2 text-lg text-gray-600 font-medium">Here's your agenda for today.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between transition-shadow hover:shadow-md">
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Completed Tasks Today</p>
                  <p className="text-5xl font-black text-gray-900">{data.stats.completedTasksToday}</p>
                </div>
                <div className="p-4 bg-green-100 rounded-2xl">
                  <span className="text-3xl">✅</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between transition-shadow hover:shadow-md">
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Current Streak</p>
                  <p className="text-5xl font-black text-gray-900">{data.stats.streak}</p>
                </div>
                <div className="p-4 bg-orange-100 rounded-2xl">
                  <span className="text-3xl">🔥</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Today's Actions</h2>
              
              <div className="space-y-4">
                {data.actions.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
                    <p className="text-gray-500 text-lg font-bold">No tasks today. Great job!</p>
                  </div>
                ) : (
                  data.actions.map((action) => (
                    <div key={action.leadId} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all hover:shadow-md border-l-4 hover:border-l-black">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-900 tracking-tight">{action.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${getPriorityColors(action.category)}`}>
                            {action.category}
                          </span>
                        </div>
                        <p className="text-base font-medium text-gray-600">
                          <span className="text-gray-400 font-bold mr-2">ACTION:</span> 
                          {action.actionType} • {action.phone}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => setSelectedLead(action.leadId)}
                        className="shrink-0 bg-black text-white hover:bg-gray-800 font-bold py-3 px-6 rounded-xl transition-all shadow-sm flex items-center gap-2"
                      >
                        Mark as Done
                        <span>✓</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Modern Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-gray-100 transform transition-all">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight text-center">Set Next Follow-up</h3>
            <div className="flex flex-col gap-3">
              {['Tomorrow', '3 Days', 'Next Week', 'Custom Date'].map(opt => (
                <button
                  key={opt}
                  disabled={actionLoading}
                  onClick={() => handleCompleteTask(opt)}
                  className="w-full bg-white border-2 border-gray-200 text-gray-800 hover:border-black hover:text-black py-3.5 rounded-xl font-bold transition-all disabled:opacity-50 text-base"
                >
                  {opt}
                </button>
              ))}
              <div className="my-3 border-t border-gray-100"></div>
              <button
                disabled={actionLoading}
                onClick={() => handleCompleteTask('No Follow-up')}
                className="w-full text-gray-500 hover:text-gray-900 py-3 rounded-xl font-bold transition-colors disabled:opacity-50 text-base"
              >
                No Follow-up
              </button>
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              className="mt-6 w-full text-center py-3 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
