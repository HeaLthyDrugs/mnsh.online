import { EmailItem } from "./email-item";
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";
import { Panel, PanelContent } from "../components/panel";
import { USER } from "../data/user";
import {
  MapPinIcon,
  MarsIcon,
  User,
  VenusIcon,
  BriefcaseIcon,
  SparklesIcon,
  GlobeIcon,
  LinkedinIcon,
  GithubIcon,
  CircleDotIcon,
  FileTextIcon,
} from "lucide-react";

export function Overview() {
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2.5">

        {/* Name Item */}
        <IntroItem>
          <IntroItemIcon>
            <User />
          </IntroItemIcon>
          <IntroItemContent aria-label={`Name: ${USER.displayName}`}>
            {USER.fullName}
          </IntroItemContent>
        </IntroItem>

        {/* Title / Role */}
        <IntroItem>
          <IntroItemIcon>
            <BriefcaseIcon />
          </IntroItemIcon>
          <IntroItemContent aria-label={`Role: ${USER.jobTitle}`}>
            {USER.jobTitle}
          </IntroItemContent>
        </IntroItem>

        {/* Location Item */}
        <IntroItem>
          <IntroItemIcon>
            <MapPinIcon />
          </IntroItemIcon>
          <IntroItemContent>
            <IntroItemLink
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                USER.address
              )}`}
              aria-label={`Location: ${USER.address}`}
            >
              {USER.address}
            </IntroItemLink>
          </IntroItemContent>
        </IntroItem>

        {/* Email Item */}
        <EmailItem email={USER.email} />

        {/* Portfolio Link */}
        {USER.website && (
          <IntroItem>
            <IntroItemIcon>
              <GlobeIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={USER.website}
                aria-label="Portfolio website"
              >
                mnsh.online
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>
        )}

        {/* Pronouns Item */}
        <IntroItem>
          <IntroItemIcon>
            {USER.gender === "male" ? <MarsIcon /> : <VenusIcon />}
          </IntroItemIcon>
          <IntroItemContent aria-label={`Pronouns: ${USER.pronouns}`}>
            {USER.pronouns}
          </IntroItemContent>
        </IntroItem>

      </PanelContent>
    </Panel>
  );
}
