"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddLeadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Form State Values
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("NEW");
  const [followUpDate, setFollowUpDate] = useState("");
  const [preferredAction, setPreferredAction] = useState("CALL");
  const [leadSource, setLeadSource] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Check locally natively on client context preventing pre-flashes
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

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
      const payload = {
        name,
        phone,
        status,
        followUpDate,
        preferredAction,
        leadSource,
        notes,
      };

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

      // Automatically route back to the leads tracking UI
      router.push("/leads");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-8 px-4 sm:px-6 lg:px-8">
      <main className="max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Add New Lead</h1>
            <button
              type="button"
              onClick={() => router.push("/leads")}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 text-sm">
              {error}
            </div>
          )}

          {/* Form mapping constraints statically via HTML inputs ensuring correct parsing structure */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Name (Required) */}
              <div>
                <label flex-auto="true" htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Phone (Required) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-colors"
                  placeholder="+1 234 567 890"
                />
              </div>

              {/* Status (Dropdown Mapped to Enums) */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-colors bg-white"
                >
                  <option value="NEW">New</option>
                  <option value="CONTACTED">Contacted</option>
                  <option value="INTERESTED">Interested</option>
                  <option value="NEGOTIATION">Negotiation</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              {/* Preferred Action (Dropdown Mapped to Enums) */}
              <div>
                <label htmlFor="preferredAction" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Action
                </label>
                <select
                  id="preferredAction"
                  value={preferredAction}
                  onChange={(e) => setPreferredAction(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-colors bg-white"
                >
                  <option value="CALL">Call</option>
                  <option value="MESSAGE">Message</option>
                  <option value="CLOSE">Close</option>
                </select>
              </div>

              {/* Follow-up Date (Required Native String Input wrapper) */}
              <div>
                <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Follow-up Date *
                </label>
                <input
                  id="followUpDate"
                  type="date"
                  required
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-colors"
                />
              </div>

              {/* Optional Standard Text Input Field */}
              <div>
                <label htmlFor="leadSource" className="block text-sm font-medium text-gray-700 mb-1">
                  Lead Source
                </label>
                <input
                  id="leadSource"
                  type="text"
                  value={leadSource}
                  onChange={(e) => setLeadSource(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-colors"
                  placeholder="Website, Referral, etc."
                />
              </div>
            </div>

            {/* Formatted Area Constraint */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none transition-colors resize-y"
                placeholder="Additional details about the lead..."
              />
            </div>

            {/* Post Wrapper Constraints */}
            <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push("/leads")}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save Lead"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
