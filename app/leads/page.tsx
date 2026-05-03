"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppNavbar } from "@/components/app-navbar";
import { useToast } from "@/components/providers";

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

function LeadsTableSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[280px]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="border-b border-gray-100">
                <td className="px-6 py-4">
                  <div className="h-4 w-32 rounded bg-gray-100 animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-28 rounded bg-gray-100 animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-7 w-24 rounded-full bg-gray-100 animate-pulse" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-24 rounded bg-gray-100 animate-pulse" />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="ml-auto h-9 w-28 rounded-xl bg-gray-100 animate-pulse" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function LeadsListPage() {
  const router = useRouter();
  const { showToast } = useToast();
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
    const confirmDelete = window.confirm(
      "Delete this lead? This cannot be undone."
    );
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
        showToast("Lead deleted");
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

  /** Pipeline status: primary gray/black, accent blue; orange only for negotiation. */
  const getStatusBadgeColors = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "CONTACTED":
        return "bg-primary-50 text-primary-800 border-primary-200";
      case "INTERESTED":
        return "bg-gray-100 text-gray-900 border-gray-300";
      case "NEGOTIATION":
        return "bg-orange-50 text-orange-900 border-orange-200";
      case "CLOSED":
        return "bg-gray-800 text-white border-gray-800";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <AppNavbar active="leads" onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Leads</h1>
            <p className="mt-2 text-gray-600 font-medium">Track your leads and follow-up dates.</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/leads/new")}
            className="cursor-pointer w-full sm:w-auto text-center bg-black hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-xl transition-colors shadow-sm whitespace-nowrap"
          >
            + Add Lead
          </button>
        </div>

        {error && (
          <div className="mb-6 p-5 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-semibold text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <LeadsTableSkeleton />
        ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[200px]">
          <div className="overflow-x-auto -mx-px">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider font-semibold text-gray-500">
                  <th className="px-6 py-4 text-left align-middle">Name</th>
                  <th className="px-6 py-4 text-left align-middle">Phone</th>
                  <th className="px-6 py-4 text-left align-middle">Status</th>
                  <th className="px-6 py-4 text-left align-middle">Follow-up</th>
                  <th className="px-6 py-4 text-right align-middle">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr className="border-b border-gray-100">
                    <td colSpan={5} className="px-6 py-20 text-center align-middle min-h-[240px]">
                      <p className="text-gray-600 text-base font-medium">No leads yet. Add your first lead.</p>
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr
                      key={lead.leadId}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/90 transition-colors group"
                    >
                      <td className="px-6 py-4 align-middle">
                        <p className="text-sm font-semibold text-gray-900">{lead.name}</p>
                      </td>
                      <td className="px-6 py-4 align-middle text-sm text-gray-600 tabular-nums">
                        {lead.phone}
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span
                          className={`inline-flex items-center justify-center min-h-[1.75rem] px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide ${getStatusBadgeColors(lead.status)}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle text-sm text-gray-600 tabular-nums">
                        {new Date(lead.followUpDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right align-middle text-sm">
                        <div className="flex justify-end gap-2 flex-wrap sm:flex-nowrap">
                          <Link
                            href={`/leads/${lead.leadId}`}
                            className="cursor-pointer w-full sm:w-auto text-center bg-white border border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(lead.leadId)}
                            className="cursor-pointer w-full sm:w-auto bg-red-50 text-red-700 hover:bg-red-100 py-2.5 px-4 rounded-xl font-semibold text-sm transition-colors border border-red-100"
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
        )}
      </main>
    </div>
  );
}
