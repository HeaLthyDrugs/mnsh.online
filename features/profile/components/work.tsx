import { Panel, PanelHeader, PanelTitle } from "./panel";
import { getAllWorks } from "@/features/work/lib/works";
import { WorksList } from "./works-list";

export default function Work() {
  const allWorks = getAllWorks();

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>Works</PanelTitle>
      </PanelHeader>

      <WorksList allWorks={allWorks} />
    </Panel>
  );
}