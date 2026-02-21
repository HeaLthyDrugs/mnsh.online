"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BlogList } from "./blog-list";
import type { BlogPost } from "../types/blog-post";

interface BlogListWithSearchProps {
    posts: BlogPost[];
}

export function BlogListWithSearch({ posts }: BlogListWithSearchProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";

    const filteredPosts = useMemo(() => {
        if (!query) return posts;

        return posts.filter((post) => {
            const titleMatch = post.metadata.title.toLowerCase().includes(query);
            const descriptionMatch = post.metadata.description
                ?.toLowerCase()
                .includes(query);
            const categoryMatch = post.metadata.category?.toLowerCase().includes(query);
            const tagsMatch = post.metadata.tags?.some((tag) =>
                tag.toLowerCase().includes(query)
            );
            const authorMatch = post.metadata.author?.toLowerCase().includes(query);

            return (
                titleMatch ||
                descriptionMatch ||
                categoryMatch ||
                tagsMatch ||
                authorMatch
            );
        });
    }, [posts, query]);

    return <BlogList posts={filteredPosts} />;
}
