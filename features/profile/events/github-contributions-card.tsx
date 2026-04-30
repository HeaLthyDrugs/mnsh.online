import { getCachedContributions } from "@/lib/get-cached-contributions";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/components/contribution-graph";
import { cn } from "@/lib/utils";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";

const GITHUB_CONTRIBUTIONS_CLASSES = "col-span-4 md:col-span-8 lg:col-span-12 row-span-2";

interface GitHubContributionsCardProps {
  username: string;
  githubProfileUrl: string;
}

function GitHubContributionsFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  );
}

async function GitHubContributionsContent({
  username,
  githubProfileUrl,
}: GitHubContributionsCardProps) {
  const data = await getCachedContributions(username);

  if (!data || data.length === 0) {
    return (
      <div className="flex h-40.5 w-full items-center justify-center">
        <p className="text-muted-foreground">No contribution data available</p>
      </div>
    );
  }

  return (
    <ContributionGraph
      className="mx-auto py-4 px-4"
      data={data}
      blockSize={11}
      blockMargin={3}
      blockRadius={0}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-0"
        title="GitHub Contributions"
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger asChild>
              <g>
                <ContributionGraphBlock
                  activity={activity}
                  dayIndex={dayIndex}
                  weekIndex={weekIndex}
                />
              </g>
            </TooltipTrigger>
            <TooltipContent className="font-sans">
              <p>
                {activity.count} contribution{activity.count > 1 ? "s" : null}{" "}
                on {format(new Date(activity.date), "dd.MM.yyyy")}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="px-4">
        <ContributionGraphTotalCount>
          {({ totalCount, year }) => (
            <div className="text-muted-foreground">
              {totalCount.toLocaleString("en")} contributions in {year} on{" "}
              <a
                className="text-foreground link-underline"
                href={githubProfileUrl}
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend />
      </ContributionGraphFooter>
    </ContributionGraph>
  );
}

export function GitHubContributionsCard({
  username,
  githubProfileUrl,
}: GitHubContributionsCardProps) {
  return (
    <div
      className={cn(
        "bg-card overflow-hidden border",
        "animate-[fadeSlideUp_0.5s_ease-out_forwards]",
        "opacity-0",
        GITHUB_CONTRIBUTIONS_CLASSES
      )}
      style={{
        animationDelay: "200ms",
      }}
    >
      <Suspense fallback={<GitHubContributionsFallback />}>
        <GitHubContributionsContent
          username={username}
          githubProfileUrl={githubProfileUrl}
        />
      </Suspense>
    </div>
  );
}
