import dayjs from "dayjs";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTableOfContents } from "fumadocs-core/content/toc";
import type { BlogPosting as PageSchema, WithContext } from "schema-dts";

import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getAllWorks, getWorkBySlug } from "@/features/work/lib/works";
import { findNeighbour, getPostBySlug } from "@/features/work/data/posts";
import { Prose } from "@/components/ui/typography";
import { InlineTOC } from "@/components/inline-toc";
import { FloatingTOC } from "@/components/floating-toc";
import { MDX } from "@/components/mdx";
import { cn } from "@/lib/utils";
import { Post } from "@/features/work/types/work-post";
import { SITE_INFO } from "@/config/site";
import { USER } from "@/features/profile/data/user";
import { KeyboardNavigation } from "@/components/keyboard-navigation";


export async function generateStaticParams() {
  const works = getAllWorks();
  return works.map((work) => ({
    slug: work.slug,
  }));
}

function getPageJsonLd(post: Post): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    image:
      post.metadata.image ||
      `/og/simple?title=${encodeURIComponent(post.metadata.title)}`,
    url: `${SITE_INFO.url}${getPostUrl(post)}`,
    datePublished: dayjs(post.metadata.createdAt).toISOString(),
    dateModified: dayjs(post.metadata.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  const post = getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  const { title, description, image, createdAt, updatedAt } = post.metadata;

  const postUrl = getPostUrl(post);
  const ogImage = image || `/og/simple?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      url: postUrl,
      type: "article",
      publishedTime: dayjs(createdAt).toISOString(),
      modifiedTime: dayjs(updatedAt).toISOString(),
      images: {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const slug = (await params).slug;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const toc = getTableOfContents(work.content);

  const allWorks = getAllWorks();
  const { previous, next } = findNeighbour(allWorks, slug);

  return (
    <>
      <KeyboardNavigation
        previousUrl={previous ? `/work/${previous.slug}` : null}
        nextUrl={next ? `/work/${next.slug}` : null}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(work)).replace(/</g, "\\u003c"),
        }}
      />
      <div className="flex items-center justify-between p-2 pl-4">
        <Button
          className="h-7 gap-2 rounded-lg px-0 text-muted-foreground"
          variant="link"
          asChild
        >
          <Link href="/work">
            <ArrowLeftIcon />
            Works
          </Link>
        </Button>

        <div className="flex items-center gap-1">
          {previous && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/work/${previous.slug}`} className="rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <kbd className="pointer-events-none flex h-5 min-w-6 items-center justify-center gap-1 rounded-sm bg-black/5 px-1 font-sans text-[13px] font-normal text-muted-foreground shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs [&_svg:not([class*='size-'])]:size-3">
                    <ArrowLeftIcon />
                    <span className="sr-only">Previous: {previous.metadata.title}</span>
                  </kbd>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex items-center gap-2">
                <Kbd>←</Kbd>
                <span>{previous.metadata.title}</span>
              </TooltipContent>
            </Tooltip>
          )}

          {next && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/work/${next.slug}`} className="rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <kbd className="pointer-events-none flex h-5 min-w-6 items-center justify-center gap-1 rounded-sm bg-black/5 px-1 font-sans text-[13px] font-normal text-muted-foreground shadow-[inset_0_-1px_2px] shadow-black/10 select-none dark:bg-white/10 dark:shadow-white/10 dark:text-shadow-xs [&_svg:not([class*='size-'])]:size-3">
                    <ArrowRightIcon />
                    <span className="sr-only">Next: {next.metadata.title}</span>
                  </kbd>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex items-center gap-2">
                <span>{next.metadata.title}</span>
                <Kbd>→</Kbd>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="border-y border-edge">
        <div
          className={cn(
            "relative flex h-8 w-full",
            "before:absolute before:inset-0 before:-z-1 before:h-full before:w-full",
            "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56"
          )}
        />
      </div>

      <Prose className="px-4">
        <div className="-mx-4 px-4 pb-4 mb-4 pt-4 not-prose">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
            {work.metadata.title}
          </h1>
          <p className="text-base text-muted-foreground text-balance mb-6">
            {work.metadata.description}
          </p>
          <InlineTOC items={toc} />
        </div>


        <div>
          <MDX code={work.content} />
        </div>
      </Prose>

      <FloatingTOC items={toc} />

      <div className="border-t border-edge h-4 w-full" />
    </>
  );
}

function getPostUrl(post: Post) {
  const isComponent = post.metadata.category === "components";
  return isComponent ? `/blog/${post.slug}` : `/work/${post.slug}`;
}
