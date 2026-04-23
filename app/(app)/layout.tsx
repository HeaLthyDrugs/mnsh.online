import dynamic from "next/dynamic";

import { SiteFooter } from "@/components/site-footer";
import { SiteFooterCredit } from "@/components/site-footer-credit";
import { SiteHeader } from "@/components/site-header";

const ScrollTop = dynamic(() =>
  import("@/components/scroll-top").then((mod) => mod.ScrollTop)
);

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="max-w-screen overflow-x-hidden px-2">{children}</main>
      <SiteFooter />
      <SiteFooterCredit />

      {/* Scroll top Button */}
      {/* <ScrollTop /> */}
    </>
  );
}
