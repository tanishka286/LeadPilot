import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads | LeadPilot",
};

export default function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
