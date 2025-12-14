import type { Metadata } from "next";
import { Suspense } from "react";

import { WorkList } from "@/features/work/components/work-list";
import { WorkListWithSearch } from "@/features/work/components/work-list-with-search";
import { WorkSearchInput } from "@/features/work/components/work-search-input";
import { getAllWorks } from "@/features/work/lib/works";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A showcase of my freelance projects, personal work, and client collaborations.",
};

export default function Page() {
  const allWorks = getAllWorks();

  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Works</h1>
      </div>

      <div className="p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description as string}
        </p>
      </div>

      <div className="screen-line-before screen-line-after p-2">
        <Suspense
          fallback={
            <div className="flex h-9 w-full rounded-lg border border-input shadow-xs dark:bg-input/30" />
          }
        >
          <WorkSearchInput />
        </Suspense>
      </div>

      <Suspense fallback={<WorkList works={allWorks} />}>
        <WorkListWithSearch works={allWorks} />
      </Suspense>

      <div className="h-4" />
    </div>
  );
}
