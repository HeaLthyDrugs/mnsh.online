import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogList } from "@/features/blog/components/blog-list";
import { BlogListWithSearch } from "@/features/blog/components/blog-list-with-search";
import { BlogSearchInput } from "@/features/blog/components/blog-search-input";
import { getAllBlogs } from "@/features/blog/lib/blogs";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts, tutorials, and insights on technology, design, and development.",
};

export default function Page() {
    const allBlogs = getAllBlogs();

    return (
        <div className="min-h-svh">
            <div className="screen-line-after px-2 py-2">
                <h1 className="text-3xl font-semibold font-heading">Blog</h1>
            </div>

            <div className="px-2 py-2">
                <p className="font-heading text-sm text-balance text-muted-foreground">
                    {metadata.description as string}
                </p>
            </div>

            <div className="screen-line-before screen-line-after p-2">
                <Suspense
                    fallback={
                        <div className="flex h-9 w-full rounded-lg border border-input shadow-xs dark:bg-input/30" />
                    }
                >
                    <BlogSearchInput />
                </Suspense>
            </div>

            <Suspense fallback={<BlogList posts={allBlogs} />}>
                <BlogListWithSearch posts={allBlogs} />
            </Suspense>

            <div className="h-4" />
        </div>
    );
}
