import { USER } from "@/features/profile/data/user";
import { NavItem } from "@/types/nav";
;

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://mnsh.online",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Me",
    href: "/",
    shortcut: "M",
    description: "Go to Home page",
  },
  {
    title: "Works",
    href: "/work",
    shortcut: "W",
    description: "View my works",
  },
];

export const GITHUB_USERNAME = "HeaLthyDrugs";
export const SOURCE_CODE_GITHUB_REPO = "HeaLthyDrugs/mnsh.online";
export const SOURCE_CODE_GITHUB_URL = "https://github.com/HeaLthyDrugs/mnsh.online";

export const UTM_PARAMS = {
  utm_source: "mnsh.online",
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};