import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminConsole from "@/components/Admin";
import { jwtVerify } from "jose";

export const metadata = {
  title: "Admin Console | ARKA CRETE",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || "arka-crete-super-secret-key-2026");
    // Verify token validity
    await jwtVerify(token, secret);
  } catch {
    redirect("/admin/login");
  }

  return (
    <main>
      <AdminConsole />
    </main>
  );
}
