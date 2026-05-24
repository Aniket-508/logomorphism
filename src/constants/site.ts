export const FALLBACK_SITE_ORIGIN = "https://termcn.dev" as const;

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== "production") {
    return "http://localhost:3000";
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return process.env.SITE_URL ?? FALLBACK_SITE_ORIGIN;
};

const baseUrl = getBaseUrl();

export const SITE = {
  AUTHOR: {
    NAME: "Aniket Pawar",
    TWITTER: "@alaymanguy",
  },
  DESCRIPTION: {
    LONG: "A curated collection of all the different brand logo styles like discomorphism, balloonmorphism, monetmorphism, etc.",
    SHORT: "Curated collection of brand logo styles",
  },
  KEYWORDS: [
    "logos",
    "logo",
    "logo design",
    "logo collection",
    "logo archive",
    "logo gallery",
    "logo showcase",
    "logomorphism",
    "discomorphism",
    "balloonmorphism",
    "monetmorphism",
  ] as const,
  NAME: "Logomorphism",
  OG_IMAGE: `${baseUrl}/og.png`,
  URL: baseUrl,
};

export const META_THEME_COLORS = {
  dark: "#0a0a0a",
  light: "#ffffff",
};

export const UTM_PARAMS = {
  utm_source: new URL(baseUrl).hostname,
};
