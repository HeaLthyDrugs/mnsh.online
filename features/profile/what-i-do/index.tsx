import { CollapsibleList } from "@/components/collapsible-list";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "../components/panel";
import { SERVICES } from "../data/services";
import { ServiceItem } from "../service/service-item";

export default function WhatIDo() {
    return (
        <Panel id="what-i-do">
            <PanelHeader>
                <PanelTitle>What I do ?</PanelTitle>
            </PanelHeader>
            <CollapsibleList max={4}>
                {SERVICES.map((item) => (
                    <ServiceItem key={item.title} service={item} />
                ))}
            </CollapsibleList>
        </Panel>
    );
}
