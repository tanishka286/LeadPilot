"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Lead {
  leadId: string;
  name: string;
  phone: string;
  status: string;
  followUpDate: string;
  preferredAction?: string;
  leadSource?: string;
  lastContacted?: string;
  createdAt: string;
}

export default function LeadsListPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/leads", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch leads");
      }

      const data = await res.json();
      setLeads(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [router]);

  const handleDelete = async (leadId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        fetchLeads();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete lead");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const getStatusBadgeColors = (status: string) => {
    switch (status) {
      case "NEW": return "bg-gray-100 text-gray-800 border-gray-200";
      case "CONTACTED": return "bg-blue-100 text-blue-800 border-blue-200";
      case "INTERESTED": return "bg-purple-100 text-purple-800 border-purple-200";
      case "NEGOTIATION": return "bg-orange-100 text-orange-800 border-orange-200";
      case "CLOSED": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-extrabold text-black tracking-tight">LeadPilot</span>
              <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold transition-colors">
                  Dashboard
                </Link>
                <Link href="/leads" className="border-black text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-bold">
                  Leads
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="sm:hidden flex space-x-4 mr-4">
                <Link href="/dashboard" className="text-gray-500 text-sm font-bold">Dashboard</Link>
                <Link href="/leads" className="text-gray-900 text-sm font-bold">Leads</Link>
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

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Leads</h1>
            <p className="mt-2 text-gray-600 font-medium">Manage and track your deals.</p>
          </div>
          <button
            onClick={() => router.push("/leads/new")}
            className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm whitespace-nowrap"
          >
            + Add Lead
          </button>
        </div>

        {error && (
          <div className="mb-6 p-5 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-bold">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider font-extrabold text-gray-500">
                  <th className="px-6 py-5">Name</th>
                  <th className="px-6 py-5">Phone</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5">Follow-up</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <p className="text-gray-500 text-lg font-bold">No leads yet. Add your first lead.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.leadId} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-5">
                        <p className="text-sm font-extrabold text-gray-900">{lead.name}</p>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-500">
                        {lead.phone}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide opacity-90 ${getStatusBadgeColors(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-gray-500">
                        {new Date(lead.followUpDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-5 text-right text-sm font-medium">
                        <div className="flex justify-end gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/leads/${lead.leadId}`}
                            className="bg-white border-2 border-gray-200 hover:border-black text-gray-700 hover:text-black py-1.5 px-4 rounded-xl font-bold transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(lead.leadId)}
                            className="bg-red-50 text-red-600 hover:bg-red-100 py-1.5 px-4 rounded-xl font-bold transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
