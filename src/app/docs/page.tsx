import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocPage from "@/components/docs/DocPage";
import { PALS_DOCS_ENABLED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description: "How Pals works: making pals, rules and approvals, routines, triggers, apps, passwords and more.",
};

export default function DocsHome() {
  if (!PALS_DOCS_ENABLED) notFound();
  return <DocPage slug="" />;
}
