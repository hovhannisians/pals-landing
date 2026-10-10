import type { Metadata } from "next";
import DocPage from "@/components/docs/DocPage";

export const metadata: Metadata = {
  title: "Docs",
  description: "How Pals works: making pals, rules and approvals, routines, triggers, apps, passwords and more.",
};

export default function DocsHome() {
  return <DocPage slug="" />;
}
