"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppNavbar } from "@/components/app-navbar";
import { useToast } from "@/components/providers";
import { SubmitSpinner } from "@/components/submit-spinner";

const inputClass =
  "w-full px-4 py-3.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/10 focus:border-gray-400 dark:focus:border-gray-500 transition-all duration-200 ease-in-out font-medium text-gray-900 dark:text-white";
const labelClass =
  "block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5";
const primaryBtn =
  "w-full cursor-pointer inline-flex items-center justify-center gap-2 py-3.5 text-base font-semibold bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-xl shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";
const secondaryBtn =
  "w-full cursor-pointer py-3.5 text-base font-semibold border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 ease-in-out hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

export default function AddLeadPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
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
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const payload = { name, phone, status, followUpDate, preferredAction, leadSource, notes };
      const res = await fetch("/api/leads", {
        method: "POST",
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
        setError(data.message || "An error occurred while creating the lead.");
        setLoading(false);
        return;
      }

      showToast("Lead added");
      router.push("/leads");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col font-sans text-gray-900 dark:text-white">
      <AppNavbar active="leads" onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
        <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <Link
            href="/leads"
            className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4 inline-block transition-all duration-200 ease-in-out cursor-pointer"
          >
            ← Back to Leads
          </Link>
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white tracking-tight">Add New Lead</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 min-h-[320px] transition-all duration-200 ease-in-out hover:shadow-lg">
          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 rounded-xl border border-red-100 dark:border-red-900/50 font-semibold text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
              <div>
                <label htmlFor="name" className={labelClass}>
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
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="+1 234 567 890"
                />
              </div>

              <div>
                <label htmlFor="status" className={labelClass}>
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
                <label htmlFor="preferredAction" className={labelClass}>
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
                <label htmlFor="followUpDate" className={labelClass}>
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
                <label htmlFor="leadSource" className={labelClass}>
                  Lead Source
                </label>
                <input
                  id="leadSource"
                  type="text"
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value)}
                  className={inputClass}
                  placeholder="Website, Referral, etc."
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className={labelClass}>
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={`${inputClass} resize-y min-h-[120px]`}
                placeholder="Additional details about the lead..."
              />
            </div>

            <div className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className={primaryBtn}
              >
                {loading ? (
                  <>
                    <SubmitSpinner className="border-white/40 border-t-white dark:border-gray-300/50 dark:border-t-black" />
                    Loading...
                  </>
                ) : (
                  "Save Lead"
                )}
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => router.push("/leads")}
                className={secondaryBtn}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        </div>
      </main>
    </div>
  );
}
