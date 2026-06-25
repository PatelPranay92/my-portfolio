import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://pranaypatel-portfolio.vercel.app/"),
  title: "Pranay Patel — Full Stack Developer",
  description:
    "Portfolio of Pranay Patel — Full Stack Developer specializing in modern web technologies and enterprise-grade applications. Building scalable web applications and modern digital experiences.",
  keywords: [
    "Pranay Patel",
    "Full Stack Developer",
    "Software Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Pranay Patel" }],
  creator: "Pranay Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Pranay Patel — Full Stack Developer",
    description:
      "Building scalable web applications and modern digital experiences.",
    siteName: "Pranay Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pranay Patel — Full Stack Developer",
    description:
      "Building scalable web applications and modern digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Pranay Patel",
              jobTitle: "Full Stack Developer",
              url: "https://pranaypatel.dev",
              sameAs: [
                "https://github.com/PatelPranay92",
                "www.linkedin.com/in/pranay-patel-ab1168284",
              ],
              knowsAbout: [
                "Full Stack Development",
                "React",
                "Next.js",
                "TypeScript",
                "Python",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
