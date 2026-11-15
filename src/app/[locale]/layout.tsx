import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Syne, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { DecorativeBackground } from "@/components/shared/DecorativeBackground";
import { ImageGalleryProvider } from "@/components/shared/ImageGallery";
import { routing } from "@/i18n/routing";

import "../globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const surgena = localFont({
  src: "../fonts/SurgenaPersonalUseOnly.woff",
  weight: "600",
  style: "normal",
  variable: "--font-surgena",
  display: "swap",
  fallback: ["sans-serif"],
});

const Cimo = localFont({
  src: "../fonts/CimoOne.otf",
  weight: "600",
  style: "normal",
  variable: "--font-cimo",
  display: "swap",
  fallback: ["sans-serif"],
});

const ink = localFont({
  src: "../fonts/InkBrush.otf",
  weight: "600",
  style: "normal",
  variable: "--font-ink",
  display: "swap",
  fallback: ["sans-serif"],
});

const arBold = localFont({
  src: "../fonts/ArabicBold.ttf",
  weight: "600",
  style: "normal",
  variable: "--font-arBold",
  display: "swap",
  fallback: ["sans-serif"],
});

const palestine = localFont({
  src: "../fonts/Palestine.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-palestine",
  display: "swap",
  fallback: ["sans-serif"],
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  themeColor: "#f8f7f1",
  colorScheme: "light",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<LocaleLayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
    openGraph: {
      type: "website",
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: locale === "ar" ? "ar_LB" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const tCommon = await getTranslations("Common");
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${syne.variable} ${tajawal.variable} ${surgena.variable} ${Cimo.variable} ${ink.variable} ${arBold.variable} ${palestine.variable}`}
    >
      <head>
        {/* Runs before first paint so the reveal system never flashes content. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');window.setTimeout(function(){if(!document.documentElement.hasAttribute('data-reveal-ready')){document.documentElement.classList.add('reveal-fallback');}},8000);",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* The icon font belongs in the App Router root layout, not in a page. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="relative bg-brand-bg font-body text-body-md text-brand-text antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ImageGalleryProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-brand-dark-green focus:px-4 focus:py-2 focus:font-body focus:text-label-md focus:text-brand-white"
            >
              {tCommon("skipToContent")}
            </a>
            <DecorativeBackground />
            <Header />
            {children}
            <Footer />
            <ScrollReveal />
            <WhatsAppButton />
          </ImageGalleryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
