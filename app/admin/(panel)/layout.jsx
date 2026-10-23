import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({ children }) {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session) redirect("/admin/login");

  return <AdminShell user={{ email: session.email, name: session.name }}>{children}</AdminShell>;
}
