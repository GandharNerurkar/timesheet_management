import type { Metadata } from "next";

import { LoginShell } from "@/features/auth";

export const metadata: Metadata = {
  title: "Login | TMS",
  description: "Sign in to access your Timesheet workspace.",
};

export default function LoginPage() {
  return <LoginShell />;
}
