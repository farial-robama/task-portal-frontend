import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";
import { DecorativeBackground } from "@/components/DecorativeBackground";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taskboard — Project & Task Management",
  description: "A small-team portal for tracking project tasks end to end.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Taskboard", statusBarStyle: "default" },
  icons: { apple: "/icons/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#245A52",
};

// Runs before React hydrates so the correct theme class is on <html>
// before first paint — avoids a light-mode flash for dark-mode users.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-bg`}
      >
        <ToastProvider>
          <ServiceWorkerRegister />
          <DecorativeBackground />
          <div className="relative z-10">{children}</div>
        </ToastProvider>
      </body>
    </html>
  );
}