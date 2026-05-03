"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AppNavbar } from "@/components/app-navbar";
import { useToast } from "@/components/providers";
import { SubmitSpinner } from "@/components/submit-spinner";

const inputClass =
  "w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow font-medium text-gray-900";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2.5";

export default function EditLeadPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const params = useParams();
  const leadId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("NEW");
  const [followUpDate, setFollowUpDate] = useState("");
  const [preferredAction, setPreferredAction] = useState("CALL");
  const [leadSource, setLeadSource] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      fetchLeadData(token);
    }
  }, [router, leadId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const fetchLeadData = async (token: string) => {
    try {
      const res = await fetch("/api/leads", {
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
        throw new Error("Failed to load leads");
      }

      const leads = await res.json();
      const currentLead = leads.find((l: any) => l.leadId === leadId);

      if (!currentLead) {
        setError("Lead not found. It may have been deleted.");
        setLoading(false);
        return;
      }

      setName(currentLead.name || "");
      setPhone(currentLead.phone || "");
      setStatus(currentLead.status || "NEW");
      if (currentLead.followUpDate) {
        setFollowUpDate(new Date(currentLead.followUpDate).toISOString().split("T")[0]);
      }
      setPreferredAction(currentLead.preferredAction || "CALL");
      setLeadSource(currentLead.leadSource || "");
      setNotes(currentLead.notes || "");
    } catch (err: any) {
      setError(err.message || "An error occurred fetching the lead data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const payload = {
        name,
        phone,
        status,
        followUpDate,
        preferredAction,
        leadSource,
        notes,
      };

      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        setError(data.message || "An error occurred while updating the lead.");
        setSaving(false);
        return;
      }

      showToast("Lead updated");
      router.push("/leads");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setSaving(false);
    }
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
        <AppNavbar active="leads" onLogout={handleLogout} />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full flex flex-col items-center justify-center min-h-[50vh]">
          <div className="h-10 w-10 rounded-full border-2 border-gray-200 border-t-gray-900 animate-spin shrink-0" />
          <p className="mt-4 text-sm font-medium text-gray-600">Loading lead details…</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <AppNavbar active="leads" onLogout={handleLogout} />

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 w-full">
        <div className="mb-8">
          <Link
            href="/leads"
            className="text-sm font-semibold text-gray-500 hover:text-gray-900 mb-4 inline-block transition-colors cursor-pointer"
          >
            ← Back to Leads
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Edit Lead</h1>
        </div>

        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-6 sm:p-10 min-h-[320px]">
          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-semibold text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
              <div>
                <label className={labelClass} htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="phone">
                  Phone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="status">
                  Status *
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className={inputClass}
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="INTERESTED">Interested</option>
                  <option value="NEGOTIATION">Negotiation</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="preferredAction">
                  Preferred Action
                </label>
                <select
                  id="preferredAction"
                  value={preferredAction}
                  onChange={(e) => setPreferredAction(e.target.value)}
                  className={inputClass}
                >
                  <option value="CALL">Call</option>
                  <option value="MESSAGE">Message</option>
                  <option value="CLOSE">Close</option>
                </select>
              </div>

              <div>
                <label className={labelClass} htmlFor="followUpDate">
                  Follow-up Date *
                </label>
                <input
                  id="followUpDate"
                  type="date"
                  required
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="leadSource">
                  Lead Source
                </label>
                <input
                  id="leadSource"
                  type="text"
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${inputClass} resize-y min-h-[120px]`}
              />
            </div>

            <div className="pt-6 sm:pt-8 border-t border-gray-100 flex flex-col gap-3">
              <button
                type="submit"
                disabled={saving}
                className="w-full cursor-pointer inline-flex items-center justify-center gap-2 py-3.5 text-base font-semibold text-white bg-black hover:bg-gray-900 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {saving ? (
                  <>
                    <SubmitSpinner className="border-white/40 border-t-white" />
                    Loading...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => router.push("/leads")}
                className="w-full cursor-pointer py-3.5 text-base font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
