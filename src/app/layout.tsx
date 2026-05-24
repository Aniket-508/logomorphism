import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import HeaderControls from "@/components/header-controls";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { META_THEME_COLORS } from "@/constants/site";
import { cn } from "@/lib/utils";
import { JsonLdScripts } from "@/seo/json-ld";
import { baseMetadata } from "@/seo/metadata";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata = baseMetadata;

const fontVariables = `${geistSans.variable} ${geistMono.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLdScripts />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body
        className={cn("font-sans overscroll-none antialiased", fontVariables)}
      >
        <NuqsAdapter>
          <ThemeProvider>
            <SidebarProvider>
              <HeaderControls />
              {children}
              <Toaster position="top-center" />
            </SidebarProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
