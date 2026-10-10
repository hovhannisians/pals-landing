import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocPage from "@/components/docs/DocPage";
import { PAGES, findPage } from "@/lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = findPage((await params).slug);
  return page ? { title: `${page.title} | Docs`, description: page.description } : {};
}

export default async function Doc({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!findPage(slug)) notFound();
  return <DocPage slug={slug} />;
}
