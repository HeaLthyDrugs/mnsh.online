import { CollapsibleList } from "@/components/collapsible-list";
import { Panel, PanelContent, PanelHeader, PanelTitle, PanelTitleSup } from "../components/panel";
import { SERVICES } from "../data/services";
import { ServiceItem } from "./service-item";

export default function Service() {
    return (
        <Panel id="service">
            <PanelHeader>
                <PanelTitle>Services</PanelTitle>
                {/* <PanelTitleSup>({SERVICES.length})</PanelTitleSup> */}
            </PanelHeader>
            {/* <PanelContent> */}
            <CollapsibleList max={4}>
                {SERVICES.map((item) => (
                    <ServiceItem key={item.title} service={item} />
                ))}
            </CollapsibleList>
            {/* </PanelContent> */}
        </Panel>
    );
}