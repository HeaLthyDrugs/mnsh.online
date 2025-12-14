"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { WorkList } from "./work-list";
import type { Post } from "../types/work-post";

interface WorkListWithSearchProps {
    works: Post[];
}

export function WorkListWithSearch({ works }: WorkListWithSearchProps) {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";

    const filteredWorks = useMemo(() => {
        if (!query) return works;

        return works.filter((work) => {
            const titleMatch = work.metadata.title.toLowerCase().includes(query);
            const descriptionMatch = work.metadata.description
                ?.toLowerCase()
                .includes(query);
            const clientMatch = work.metadata.client?.toLowerCase().includes(query);
            const projectTypeMatch = work.metadata.projectType
                ?.toLowerCase()
                .includes(query);
            const techMatch = work.metadata.technologies?.some((tech) =>
                tech.toLowerCase().includes(query)
            );

            return (
                titleMatch ||
                descriptionMatch ||
                clientMatch ||
                projectTypeMatch ||
                techMatch
            );
        });
    }, [works, query]);

    return <WorkList works={filteredWorks} />;
}
