"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/Button";
import { SECTION_IDS } from "@/lib/constants";
import { staggerContainer } from "@/lib/motion";

import { useEcosystem } from "./EcosystemProvider";

export function HeroActions() {
  const t = useTranslations("Hero");
  const { setView } = useEcosystem();

  return (
    <div
      {...staggerContainer}
      className="mb-space-2xl grid grid-cols-2 flex-wrap items-center gap-space-md w-auto max-sm:grid-cols-1 max-[420px]:w-full"
    >
      <Button
        href={`#${SECTION_IDS.ecosystem}`}
        variant="green"
        shape="rounded"
        icon="arrow_forward"
        iconPosition="end"
        lift
        onClick={() => setView("plus")}
      >
        {t("primaryCta")}
      </Button>
      <Button
        href={`#${SECTION_IDS.ecosystem}`}
        variant="orange"
        shape="rounded"
        icon="auto_awesome"
        iconPosition="start"
        lift
        onClick={() => setView("youth")}
      >
        {t("secondaryCta")}
      </Button>
    </div>
  );
}
