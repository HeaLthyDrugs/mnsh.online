import type { Metadata } from "next";
import { Suspense } from "react";

import { WorkList } from "@/features/work/components/work-list";
import { WorkListWithSearch } from "@/features/work/components/work-list-with-search";
import { WorkSearchInput } from "@/features/work/components/work-search-input";
import { getAllWorks } from "@/features/work/lib/works";

export const metadata: Metadata = {
  title: "Works",
  description:
    "A showcase of my freelance, personal and collaboration works.",
};

export default function Page() {
  const allWorks = getAllWorks();

  return (
    <div className="min-h-svh">
      <div className="screen-line-after px-2 py-2">
        <h1 className="text-3xl font-semibold font-heading">Works</h1>
      </div>

      <div className="px-2 py-2">
        <p className="font-heading text-sm text-balance text-muted-foreground">
          {metadata.description as string}
        </p>
      </div>

      <div className="screen-line-before p-2">
      </div>

      <Suspense fallback={<WorkList works={allWorks} />}>
        <WorkListWithSearch works={allWorks} />
      </Suspense>

      <div className="h-4" />
    </div>
  );
}
