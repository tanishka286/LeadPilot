"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppNavbar } from "@/components/app-navbar";
import { useToast } from "@/components/providers";
import { SubmitSpinner } from "@/components/submit-spinner";

const inputClass =
  "w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-shadow font-medium text-gray-900";
const labelClass = "block text-sm font-semibold text-gray-700 mb-2.5";

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
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Add New Lead</h1>
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

            <div className="pt-6 sm:pt-8 border-t border-gray-100 flex flex-col gap-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer inline-flex items-center justify-center gap-2 py-3.5 text-base font-semibold text-white bg-black hover:bg-gray-900 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <>
                    <SubmitSpinner className="border-white/40 border-t-white" />
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
