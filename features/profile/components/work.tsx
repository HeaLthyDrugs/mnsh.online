import { Panel, PanelHeader, PanelTitle } from "./panel";
import { getAllWorks } from "@/features/work/lib/works";
import { WorkItem } from "@/features/work/components/work-item";

export default function Work() {
  const allWorks = getAllWorks();

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Work</PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {allWorks.slice(0, 4).map((work) => (
            <WorkItem key={work.slug} work={work}  />
          ))}
        </div>
      </div>
    </Panel>
  );
}