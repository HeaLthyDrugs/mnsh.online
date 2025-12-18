import localFont from "next/font/local";

// Domaine Display - for hero headlines, titles, and important text
export const fontDomaine = localFont({
  src: [
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-Regular-BF66174a224cb3d.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-RegularItalic-BF66174a2237297.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-Medium-BF66174a2239729.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-MediumItalic-BF66174a224892c.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-Semibold-BF66174a224449e.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-SemiboldItalic-BF66174a2201bc3.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-Bold-BF66174a223c3e2.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-BoldItalic-BF66174a2248b81.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-Extrabold-BF66174a2227915.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-ExtraboldItalic-BF66174a2225c9a.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-Black-BF66174a2210ef8.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/domaine/TestDomaineDisplay-BlackItalic-BF66174a222e642.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-domaine",
  display: "swap",
});

// SF Pro Display - for body text and general content
export const fontSFPro = localFont({
  src: [
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYREGULAR.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYMEDIUM.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYBOLD.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYLIGHTITALIC.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYSEMIBOLDITALIC.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYHEAVYITALIC.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYBLACKITALIC.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYTHINITALIC.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/fonts/sf-pro-display/SFPRODISPLAYULTRALIGHTITALIC.otf",
      weight: "200",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

// Export aliases for semantic naming
export const fontHeading = fontDomaine; // For hero headlines, titles, important text
export const fontBody = fontSFPro; // For body text and general content