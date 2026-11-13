import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/components/ui/Container";
import { LanguageSwitcher } from "@/features/home/components/LanguageSwitcher";
import { MobileNavigation } from "@/features/home/components/MobileNavigation";
import { PrimaryNavigation } from "@/features/home/components/PrimaryNavigation";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/lib/constants";

export async function Header() {
  const t = await getTranslations("Navigation");
  const tCommon = await getTranslations("Common");

  return (
    <header className="static w-full border-b border-brand-bg-alt bg-brand-bg/95 shadow-[0_1px_8px_rgba(37,52,43,0.04)] backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-gutter">
        <div className="flex shrink-0 items-center gap-space-md">
          <Link
            href="/"
            aria-label={tCommon("homeLink")}
            className="flex items-center gap-space-sm"
          >
            <Image
              src="/images/logo.png"
              width={1432}
              height={556}
              priority
              className="h-10 w-auto"
              alt={tCommon("logoAlt")}
            />
          </Link>
        </div>

        <PrimaryNavigation />

        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <div className="grid grid-cols-2 gap-space-sm sm:gap-space-md">
            <a
              href={`#${SECTION_IDS.ecosystem}`}
              aria-label={t("growPlusAria")}
              className="group hidden justify-center gap-space-xs rounded-full bg-grow-green px-space-md py-space-xs font-body text-label-sm text-brand-white shadow-[0_2px_8px_rgba(33,118,61,0.2)] transition-all hover:opacity-95 sm:inline-flex"
            >
              {t("growPlus")}
            </a>
            <a
              href={`#${SECTION_IDS.ecosystem}`}
              aria-label={t("growForYouthAria")}
              className="hidden items-center rounded-full bg-grow-orange px-space-md py-space-xs font-body text-label-sm text-brand-white shadow-[0_2px_8px_rgba(236,100,42,0.25)] transition-all hover:opacity-95 sm:inline-flex"
            >
              {t("growForYouth")}
            </a>
          </div>

          <div
            aria-hidden="true"
            className="hidden h-4 w-px bg-brand-bg-alt sm:block"
          />

          <LanguageSwitcher />
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
