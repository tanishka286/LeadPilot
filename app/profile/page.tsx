"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AppNavbar } from "@/components/app-navbar";
import { SubmitSpinner } from "@/components/submit-spinner";
import { getTheme, setTheme } from "@/lib/theme";

type SettingsSection = "account" | "appearance" | "security";

const inputClass =
  "block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2.5 text-gray-900 dark:text-white shadow-sm focus:border-gray-400 dark:focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/10 sm:text-sm transition-all duration-200 ease-in-out";

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 px-5 py-3 text-sm font-semibold shadow-sm transition-all duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 focus:ring-offset-2 dark:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

const sections: { id: SettingsSection; label: string }[] = [
  { id: "account", label: "Account" },
  { id: "appearance", label: "Appearance" },
  { id: "security", label: "Security" },
];

type AccountSectionProps = {
  error: string;
  success: boolean;
  name: string;
  setName: (v: string) => void;
  email: string;
  phone: string;
  setPhone: (v: string) => void;
  setSuccess: (v: boolean) => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  saving: boolean;
};

function AccountSection({
  error,
  success,
  name,
  setName,
  email,
  phone,
  setPhone,
  setSuccess,
  onSubmit,
  saving,
}: AccountSectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight mb-1">
        Account Information
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        Update your name and phone. Email cannot be changed here.
      </p>

      {error && (
        <div className="mb-4 text-sm font-semibold text-red-800 bg-red-50 p-3 rounded-xl border border-red-100">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 text-sm font-semibold text-primary-800 dark:text-primary-200 bg-primary-50 dark:bg-primary-900/40 p-3 rounded-xl border border-primary-100 dark:border-primary-800">
          Changes saved.
        </div>
      )}

      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="profile-name"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Name
          </label>
          <input
            id="profile-name"
            type="text"
            required
            minLength={2}
            value={name}
            onChange={(e) => {
              setSuccess(false);
              setName(e.target.value);
            }}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="profile-email"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Email
          </label>
          <input
            id="profile-email"
            type="email"
            value={email}
            disabled
            className="block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 px-3 py-2.5 text-gray-500 dark:text-gray-400 cursor-not-allowed sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="profile-phone"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Phone
          </label>
          <input
            id="profile-phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => {
              setSuccess(false);
              setPhone(e.target.value);
            }}
            className={inputClass}
            placeholder="Optional"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className={`w-full sm:w-auto ${primaryBtn}`}
          >
            {saving ? (
              <>
                <SubmitSpinner className="border-white/30 border-t-white dark:border-gray-300/50 dark:border-t-black" />
                Saving…
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

type AppearanceSectionProps = {
  appearanceMode: "light" | "dark";
  setAppearanceMode: React.Dispatch<
    React.SetStateAction<"light" | "dark">
  >;
};

function AppearanceSection({
  appearanceMode,
  setAppearanceMode,
}: AppearanceSectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Appearance
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Choose how LeadPilot looks on this device.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-900/40 px-4 py-4 sm:px-5 transition-all duration-200 ease-in-out">
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Theme
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Light or dark. Your choice is saved in this browser.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span
            className={`text-sm font-medium ${
              appearanceMode === "light"
                ? "text-gray-900 dark:text-white"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            Light
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={appearanceMode === "dark"}
            onClick={() =>
              setAppearanceMode((m) => {
                const next = m === "light" ? "dark" : "light";
                setTheme(next);
                return next;
              })
            }
            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-white/20 focus:ring-offset-2 dark:ring-offset-gray-800 ${
              appearanceMode === "dark"
                ? "bg-gray-900 dark:bg-gray-100"
                : "bg-gray-200 dark:bg-gray-600"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white dark:bg-gray-900 shadow ring-0 transition ${
                appearanceMode === "dark"
                  ? "translate-x-6"
                  : "translate-x-0.5"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${
              appearanceMode === "dark"
                ? "text-gray-900 dark:text-white"
                : "text-gray-400 dark:text-gray-500"
            }`}
          >
            Dark
          </span>
        </div>
      </div>
    </div>
  );
}

type SecuritySectionProps = {
  currentPassword: string;
  setCurrentPassword: (v: string) => void;
  newPassword: string;
  setNewPassword: (v: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
};

function SecuritySection({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onSubmit,
}: SecuritySectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-sm transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
          Security
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Password change feature coming soon
        </p>
      </div>

      <form className="space-y-5" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="security-current-password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Current Password
          </label>
          <input
            id="security-current-password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>
        <div>
          <label
            htmlFor="security-new-password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            New Password
          </label>
          <input
            id="security-new-password"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>
        <div>
          <label
            htmlFor="security-confirm-password"
            className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5"
          >
            Confirm Password
          </label>
          <input
            id="security-confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>
        <div className="pt-2">
          <button
            type="submit"
            className={`w-full sm:w-auto ${primaryBtn}`}
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const [section, setSection] = useState<SettingsSection | undefined>(
    undefined
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [appearanceMode, setAppearanceMode] = useState<"light" | "dark">(
    "light"
  );

  useEffect(() => {
    setAppearanceMode(getTheme());
  }, []);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) {
          localStorage.removeItem("token");
          router.push("/login");
          return;
        }
        if (!res.ok) {
          setError("Could not load profile");
          return;
        }
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone ?? "");
      } catch {
        setError("Could not load profile");
      } finally {
        setLoading(false);
        setSection((prev) => prev ?? "account");
      }
    })();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      if (!res.ok) {
        setError(data.message || "Update failed");
        return;
      }
      setName(data.name);
      setPhone(data.phone ?? "");
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordPlaceholder = (e: React.FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80 dark:from-gray-900 dark:to-gray-900 flex flex-col font-sans text-gray-900 dark:text-white">
        <AppNavbar active="profile" onLogout={handleLogout} />
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
          <div className="h-9 w-48 rounded-lg bg-gray-200/90 dark:bg-gray-700/90 animate-pulse mb-2" />
          <div className="h-5 w-72 rounded-md bg-gray-200/80 dark:bg-gray-700/80 animate-pulse mb-8" />
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="w-full lg:w-56 h-40 rounded-xl bg-gray-200/70 dark:bg-gray-700/70 animate-pulse shrink-0" />
            <div className="flex-1 rounded-2xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 p-6 sm:p-8 space-y-4">
              <div className="h-6 w-40 rounded bg-gray-100 dark:bg-gray-700 animate-pulse" />
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
              <div className="h-10 rounded-xl bg-gray-100 dark:bg-gray-700 animate-pulse" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!section) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100/80 dark:from-gray-900 dark:to-gray-900 flex flex-col font-sans text-gray-900 dark:text-white">
      <AppNavbar active="profile" onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 w-full">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <nav
            className="w-full lg:w-56 shrink-0 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-2 transition-all duration-200 ease-in-out"
            aria-label="Settings sections"
          >
            <ul className="flex flex-col gap-1">
              {sections.map(({ id, label }) => {
                const isActive = section === id;
                return (
                  <li key={id} className="w-full">
                    <button
                      type="button"
                      onClick={() => setSection(id)}
                      className={`w-full text-left rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ease-in-out ${
                        isActive
                          ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200 dark:ring-gray-600"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="w-full min-w-0 flex-1">
            {section === "account" ? (
              <AccountSection
                error={error}
                success={success}
                name={name}
                setName={setName}
                email={email}
                phone={phone}
                setPhone={setPhone}
                setSuccess={setSuccess}
                onSubmit={handleSubmit}
                saving={saving}
              />
            ) : section === "appearance" ? (
              <AppearanceSection
                appearanceMode={appearanceMode}
                setAppearanceMode={setAppearanceMode}
              />
            ) : section === "security" ? (
              <SecuritySection
                currentPassword={currentPassword}
                setCurrentPassword={setCurrentPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                onSubmit={handlePasswordPlaceholder}
              />
            ) : (
              <AccountSection
                error={error}
                success={success}
                name={name}
                setName={setName}
                email={email}
                phone={phone}
                setPhone={setPhone}
                setSuccess={setSuccess}
                onSubmit={handleSubmit}
                saving={saving}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
