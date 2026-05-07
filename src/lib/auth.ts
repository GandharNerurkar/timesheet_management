import { getServerSession, type Session } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";

export async function getServerAuthSession() {
  return getServerSession(authOptions);
}

export async function requireAuth() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session as Session & {
    user: NonNullable<Session["user"]>;
  };
}
